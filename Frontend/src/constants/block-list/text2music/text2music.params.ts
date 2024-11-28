import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface Text2MusicParams {
  prompt: string
  model_version: string
  duration: number
  seed: number
}

export const text2MusicParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      // eslint-disable-next-line camelcase
      model_version: {
        type: 'string',
        title: 'Model Version',
        default: 'large',
        enum: ['large', 'melody', 'encode-decode'],
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      duration: {
        type: 'integer',
        title: 'Duration',
        default: 5,
        // minimum: 1,
        // maximum: 1000,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      seed: {
        type: 'integer',
        title: 'Seed',
        default: 0,
        // minimum: 0,
        // maximum: 1000,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    required: ['model_version', 'duration', 'output_format', 'seed'],
  } as JSONSchemaType<Omit<Text2MusicParams, 'prompt'>>,
}
