import { JSONSchemaType } from 'ajv'
import { BlockParameters, Modality } from '../../../types'
import { uploadFileSchema } from '../common'

export interface Text2ImageParams {
  num_inference_steps: number
  guidance_scale: number
  width: number
  height: number
  prompt: string
}

export const text2ImageParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      seed: {
        type: 'integer',
        title: 'Seed',
        default: 0,
        minimum: 0,
        maximum: 1000000,
        uniforms: {
          help: 'The seed is used to initialize the image generator. Change the seed to generate different results. Save the seed if you want to reproduce the results later.',
        },
      },
      // eslint-disable-next-line camelcase
      num_inference_steps: {
        type: 'integer',
        title: 'Number of Inference Steps',
        default: 50,
        minimum: 1,
        maximum: 100,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      // eslint-disable-next-line camelcase
      guidance_scale: {
        type: 'number',
        title: 'Guidance Scale',
        default: 7.5,
        minimum: 0.0,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      width: {
        type: 'integer',
        title: 'Width',
        default: 1024,
        minimum: 1,
        maximum: 2048,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      height: {
        type: 'integer',
        title: 'Height',
        default: 1024,
        minimum: 1,
        maximum: 2048,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      // uploadImage: {
      //   ...uploadFileSchema('Upload Image', Modality.Image),
      // },
      // uploadVideo: {
      //   ...uploadFileSchema('Upload Video', Modality.Video),
      // },
      // uploadAudio: {
      //   ...uploadFileSchema('Upload Audio', Modality.Audio),
      // },
      // upload3d: {
      //   ...uploadFileSchema('Upload 3D', Modality.ThreeDimentional),
      // },
    },
    required: ['num_inference_steps', 'guidance_scale', 'width', 'height'],
  } as JSONSchemaType<Omit<Text2ImageParams, 'prompt'>>,
}
