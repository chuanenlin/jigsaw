import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface TextAndSketch2ImageParams {
  image: string
  prompt: string
  seed: number
}

export const textAndSketch2ImageParams: BlockParameters = {
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
  } as JSONSchemaType<Omit<TextAndSketch2ImageParams, 'image' | 'prompt'>>,
}
