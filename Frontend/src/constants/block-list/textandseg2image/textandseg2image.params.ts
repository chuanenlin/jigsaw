import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface TextAndSeg2ImageParams {
  image: string
  prompt: string
  seed: number
}

export const textAndSeg2ImageParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      seed: {
        type: 'number',
        title: 'Seed',
        default: 0,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    required: ['seed'],
  } as JSONSchemaType<Omit<TextAndSeg2ImageParams, 'image' | 'prompt'>>,
}
