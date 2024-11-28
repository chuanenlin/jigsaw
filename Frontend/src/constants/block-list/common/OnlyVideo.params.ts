import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface OnlyVideoParams {
  video: string
}

export const OnlyVideoParams: BlockParameters = {
  model: {},
  schema: {} as JSONSchemaType<Omit<OnlyVideoParams, 'video'>>,
}
