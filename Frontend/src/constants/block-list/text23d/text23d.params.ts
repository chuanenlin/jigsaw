import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface Text23dParams {
  prompt: string
  guidance_scale: number
}

export const text23dParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      // eslint-disable-next-line camelcase
      guidance_scale: {
        type: 'number',
        title: 'Guidance Scale',
        default: 15,
        // minimum: 0.0,
        // maximum: 1.0,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    required: ['guidance_scale', 'render_mode'],
  } as JSONSchemaType<Omit<Text23dParams, 'prompt'>>,
}
