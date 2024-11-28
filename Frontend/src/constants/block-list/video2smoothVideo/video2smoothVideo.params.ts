import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface Video2SmoothVideoParams {
  video: string
  interpolation_factor: number
}

export const video2SmoothVideoParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      // eslint-disable-next-line camelcase
      interpolation_factor: {
        type: 'number',
        title: 'Interpolation Factor',
        default: 2,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    required: ['interpolation_factor'],
  } as JSONSchemaType<Omit<Video2SmoothVideoParams, 'video'>>,
}
