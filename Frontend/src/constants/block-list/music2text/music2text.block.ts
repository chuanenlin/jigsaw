import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'

export const music2TextBlock: Block = {
  id: Endpoint.Music2Text,
  endpointName: Endpoint.Music2Text,
  name: 'Classify music genre',
  inputModality: [{ modality: Modality.Audio }],
  outputModality: Modality.Text,
  // blockParameters: music2TextParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Audio]: '/examples/edm.wav',
    },
    exampleOutput: 'hiphop, pop',
    description: 'Classify the genre of a music',
    properties: {
      maxRuntime: '91s',
    },
  },
}
