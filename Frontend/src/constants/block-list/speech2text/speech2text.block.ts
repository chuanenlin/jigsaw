import { Block, Modality } from '../../../types'
import { speech2TextParams } from './speech2text.params'
import { Endpoint } from '../../common'

export const speech2TextBlock: Block = {
  id: Endpoint.Speech2Text,
  endpointName: Endpoint.Speech2Text,
  name: 'Transcribe speech',
  inputModality: [{ modality: Modality.Audio }],
  outputModality: Modality.Text,
  blockParameters: speech2TextParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Audio]: '/examples/houston.mp3',
    },
    exampleOutput: 'Houston, we have a problem.',
    description: 'Transcribe an audio recording with speech into a text transcript',
    properties: {
      maxRuntime: '197s',
    },
  },
}
