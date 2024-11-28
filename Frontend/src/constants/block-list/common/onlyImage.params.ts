import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface OnlyImageParams {
  image: string
}

export const onlyImageParams: BlockParameters = {
  model: {},
  schema: {} as JSONSchemaType<Omit<OnlyImageParams, 'image'>>,
}
