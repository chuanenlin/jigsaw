import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface Image2BoxParams {
  image: string
  conf: number
  nms: number
  return_json: boolean
}

export const image2BoxParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      conf: {
        type: 'number',
        title: 'Confidence',
        default: 0.3,
        // minimum: 0.0,
        // maximum: 1.0,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      nms: {
        type: 'number',
        title: 'Non-Maximum Suppression',
        default: 0.3,
        // minimum: 0.0,
        // maximum: 1.0,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      // eslint-disable-next-line camelcase
      return_json: {
        type: 'boolean',
        title: 'Return JSON',
        default: false,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    required: ['conf', 'nms', 'return_json'],
  } as JSONSchemaType<Omit<Image2BoxParams, 'image'>>,
}
