import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface ImageAndText2ImageParams {
  image: string
  prompt: string
  num_inference_steps: number
  guidance_scale: number
  seed: number
}

export const imageAndText2ImageParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      // eslint-disable-next-line camelcase
      num_inference_steps: {
        type: 'number',
        title: 'Number of inference steps',
        default: 100,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      // eslint-disable-next-line camelcase
      guidance_scale: {
        type: 'number',
        title: 'Guidance scale',
        default: 7.5,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      seed: {
        type: 'number',
        title: 'Seed',
        default: 0,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    required: ['num_inference_steps'],
  } as JSONSchemaType<Omit<ImageAndText2ImageParams, 'image' | 'prompt'>>,
}
