import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface Music2TextParams {
  audio: string
  score_general_threshold: number
  score_character_threshold: number
}

export const music2TextParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      // eslint-disable-next-line camelcase
      score_general_threshold: {
        type: 'number',
        title: 'Score General Threshold',
        default: 0.35,
        // minimum: 0.0,
        // maximum: 1.0,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      // eslint-disable-next-line camelcase
      score_character_threshold: {
        type: 'number',
        title: 'Score Character Threshold',
        default: 0.85,
        // minimum: 0.0,
        // maximum: 1.0,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    required: ['score_general_threshold', 'score_character_threshold'],
  } as JSONSchemaType<Omit<Music2TextParams, 'audio'>>,
}
