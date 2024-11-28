import { BlockData } from '../types'

export const parseBlockData = (data: string) => {
  return JSON.parse(data) as BlockData
}
