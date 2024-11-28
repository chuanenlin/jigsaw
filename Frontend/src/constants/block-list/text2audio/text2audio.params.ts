import { BlockParameters } from '../../../types'
import { JSONSchemaType } from 'ajv'

export interface Text2AudioParams {
  prompt: string
  // model: string
  duration: number
  guidance: number
}

export const text2AudioParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      // model: {
      //   type: 'string',
      //   title: 'Model',
      //   default: 'tango-full',
      //   enum: ['tango', 'tango-full', 'tango-full-ft-audiocaps', 'tango-full-ft-audio-music-caps'],
      //   uniforms: {
      //     help: 'Some explanation of what this parameter actually does',
      //   },
      // },
      duration: {
        type: 'integer',
        title: 'Duration',
        default: 5,
        minimum: 1,
        maximum: 10,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      guidance: {
        type: 'integer',
        title: 'Guidance',
        default: 3,
        minimum: 0,
        maximum: 20,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    // required: ['model', 'steps', 'guidance'],
    required: ['duration', 'guidance'],
  } as JSONSchemaType<Omit<Text2AudioParams, 'prompt'>>,
}
