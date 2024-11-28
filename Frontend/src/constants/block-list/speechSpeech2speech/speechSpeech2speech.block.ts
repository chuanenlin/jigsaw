import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { speechSpeech2SpeechParams } from './speechSpeech2speech.params'

export const speechSpeech2SpeechBlock: Block = {
  id: Endpoint.SpeechSpeech2Speech,
  endpointName: Endpoint.SpeechSpeech2Speech,
  name: 'Clone a voice',
  inputModality: [
    { modality: Modality.Audio, alias: 'source_audio' },
    { modality: Modality.Audio, alias: 'reference_audio' },
  ],
  outputModality: Modality.Audio,
  blockParameters: speechSpeech2SpeechParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Audio]: ['/examples/speech.wav', '/examples/speech_woman.mp3'],
    },
    // TODO: this is dummy output, there wasn't an example output for this block in the sheet
    exampleOutput: '/examples/speech.wav',
    description: 'Change the voice of a spoken audio into the voice of another person',
    properties: {
      maxRuntime: '.s',
    },
  },
}
