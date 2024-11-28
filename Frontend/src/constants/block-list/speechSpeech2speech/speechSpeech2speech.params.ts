import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface SpeechSpeech2SpeechParams {
  source_audio: string
  reference_audio: string
  model_type: string
}

export const speechSpeech2SpeechParams: BlockParameters = {
  model: {
    // eslint-disable-next-line camelcase
    model_type: 'FreeVC',
  },
  schema: {
    type: 'object',
    properties: {
      // eslint-disable-next-line camelcase
      model_type: {
        type: 'string',
        title: 'Model',
        default: 'FreeVC',
        enum: ['FreeVC', 'FreeVC-s', 'FreeVC (24kHz)'],
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    required: ['model_type'],
  } as JSONSchemaType<Omit<SpeechSpeech2SpeechParams, 'reference_audio' | 'source_audio'>>,
}
