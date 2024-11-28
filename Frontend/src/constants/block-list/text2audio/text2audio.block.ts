import { Block, Modality } from '../../../types'
import { text2AudioParams } from './text2audio.params'
import { Endpoint } from '../../common'

export const text2AudioBlock: Block = {
  id: Endpoint.Text2Audio,
  endpointName: Endpoint.Text2Audio,
  name: 'Generate sound effects',
  inputModality: [{ modality: Modality.Text }],
  outputModality: Modality.Audio,
  blockParameters: text2AudioParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Text]: 'footsteps in a city',
    },
    exampleOutput: '/examples/steps.mp3',
    description: 'Generate sound effects from a text prompt',
    properties: {
      maxRuntime: '110s',
    },
  },
}
