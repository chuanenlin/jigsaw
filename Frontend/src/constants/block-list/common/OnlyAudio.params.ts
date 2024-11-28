import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface OnlyAudioParams {
  audio: string
}

export const onlyImageParams: BlockParameters = {
  model: {},
  schema: {} as JSONSchemaType<Omit<OnlyAudioParams, 'audio'>>,
}
