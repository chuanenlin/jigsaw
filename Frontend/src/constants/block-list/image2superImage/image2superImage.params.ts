import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface Image2SuperImageParams {
  image: string
  scale: number
  face_enhance: boolean
}

export const image2superImageParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      scale: {
        type: 'number',
        title: 'Scale',
        default: 4,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },

      // eslint-disable-next-line camelcase
      face_enhance: {
        type: 'boolean',
        title: 'Face Enhance',
        default: false,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    required: ['scale', 'face_enhance'],
  } as JSONSchemaType<Omit<Image2SuperImageParams, 'image'>>,
}
