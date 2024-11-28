import _ from 'lodash'

export const transformNested = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformer: (value: any, key: any) => Promise<any>,
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<{ [x: string]: any }> => {
  const result: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any
  } = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promises: Array<Promise<any>> = []

  _.mapValues(obj, async (value, key) => {
    const p1 = transformer(value, key)
    promises.push(p1)
    const transformedValue = await p1

    if (_.isPlainObject(transformedValue)) {
      const p2 = transformNested(transformedValue, transformer)
      promises.push(p2)
      const nestedTransfoemdValue = await p2
      result[key] = nestedTransfoemdValue
      return
    }

    result[key] = transformedValue
  })

  await Promise.all(promises)
  return result
}
