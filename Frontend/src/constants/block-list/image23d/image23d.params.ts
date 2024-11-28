import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface Image23dParams {
  image: string
  guidance_scale: number
}

export const image23dParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      // eslint-disable-next-line camelcase
      guidance_scale: {
        type: 'number',
        title: 'Guidance Scale',
        default: 15,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    required: ['guidance_scale'],
  } as JSONSchemaType<Omit<Image23dParams, 'image'>>,
}
