import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface Text2VideoParams {
  prompt: string
  num_frames: number
  num_inference_steps: number
  fps: number
  seed: number
}

export const text2VideoParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      // eslint-disable-next-line camelcase
      num_frames: {
        type: 'integer',
        title: 'Number of Frames',
        default: 50,
        // minimum: 1,
        // maximum: 100,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      // eslint-disable-next-line camelcase
      num_inference_steps: {
        type: 'integer',
        title: 'Number of Inference Steps',
        default: 50,
        // minimum: 1,
        // maximum: 1000,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      fps: {
        type: 'integer',
        title: 'Frames Per Second',
        default: 8,
        // minimum: 1,
        // maximum: 60,
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
    required: ['num_frames', 'num_inference_steps', 'fps', 'seed'],
  } as JSONSchemaType<Omit<Text2VideoParams, 'prompt'>>,
}
