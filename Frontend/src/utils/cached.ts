/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from 'lodash'

type CacheEntry = {
  args: any[]
  value: any
}

interface CachedParams {
  clearPaths: Record<number, boolean | Array<string>>
  comparePaths: Record<number, boolean | Array<string>>
}

const generateCacheKeySegment = (
  args: any[],
  paths: Record<number, boolean | Array<string>>,
): string => {
  return Object.entries(paths)
    .map(([index, pathOrBool]) => {
      const arg = args[Number(index)]
      if (pathOrBool === true) {
        return JSON.stringify(arg)
      } else if (Array.isArray(pathOrBool)) {
        return pathOrBool.map((path) => JSON.stringify(get(arg, path))).join('|')
      }
      return ''
    })
    .join('::')
}

/**
 * Decorator for caching the results of method calls based on specified argument properties.
 * The cache keys are generated based on the provided `comparePaths` and `clearPaths`.
 * The function also supports asynchronous method calls by waiting for Promises to resolve
 * before caching their results. If a Promise is rejected, the error is thrown and no result is cached.
 *
 * @param params - Configuration object for the decorator.
 * @param params.clearPaths - Paths used to determine
 *        when to clear the cache. If `true`, the entire argument is used; if an array, only the specified
 *        paths in the argument are used. The key is the index of the argument.
 * @param params.comparePaths - Paths used to generate
 *        the cache key. If `true`, the entire argument is considered; if an array, only the specified
 *        paths in the argument are used for comparison. The key is the index of the argument.
 * @returns - Method decorator that applies caching logic to the method.
 */
export const cached = ({ clearPaths = {}, comparePaths = {} }: CachedParams) => {
  const clearKeySegment = clearPaths ? generateCacheKeySegment : () => ''
  const uniqueSeparator = '@@'

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const cache = new Map<string, CacheEntry>()

    descriptor.value = async function (...args: any[]) {
      const clearSegment = clearKeySegment(args, clearPaths)
      const cacheSegment = generateCacheKeySegment(args, comparePaths)
      const cacheKey = `${clearSegment}${uniqueSeparator}${cacheSegment}`

      if (cache.has(cacheKey)) {
        console.log('HIT:', cacheKey)
        return cache.get(cacheKey)?.value
      }

      console.log('MISS:', cacheKey)

      // Clear cache based on clearPaths
      if (clearSegment) {
        Array.from(cache.keys()).forEach((key) => {
          if (key.startsWith(`${clearSegment}${uniqueSeparator}`)) {
            console.log('CLEAR: ', key)
            cache.delete(key)
          }
        })
      }

      const result = await originalMethod.apply(this, args)
      cache.set(cacheKey, { args: [...args], value: result })
      return result
    }

    return descriptor
  }
}
