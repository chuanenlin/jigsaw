import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface Face2TalkingHeadParams {
  source_image: string
  driven_audio: string
}

export const face2TalkingHeadParams: BlockParameters = {
  model: {},
  schema: {} as JSONSchemaType<Omit<Face2TalkingHeadParams, 'source_image' | 'driven_audio'>>,
}
