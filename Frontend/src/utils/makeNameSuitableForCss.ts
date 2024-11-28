import { simpleHash } from './simpleHash'

export const makeNameSuitableForCss = (name: string) => {
  return simpleHash(name)
}
