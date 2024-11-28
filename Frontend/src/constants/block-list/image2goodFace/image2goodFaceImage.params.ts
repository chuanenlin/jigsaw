import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface Image2GoodFaceImageParams {
  image: string
  version: string
  scale: number
}

export const image2GoodFaceImageParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      version: {
        type: 'string',
        title: 'Version',
        default: 'v1.4',
        enum: ['v1.4', 'v1.3', 'v1.2', 'RestoreFormer'],
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      scale: {
        type: 'number',
        title: 'Scale',
        default: 1,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    required: ['version', 'scale'],
  } as JSONSchemaType<Omit<Image2GoodFaceImageParams, 'image'>>,
}
