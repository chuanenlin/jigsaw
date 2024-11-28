import { Block, Modality } from '../../../types'
import { text2MusicParams } from './text2music.params'
import { Endpoint } from '../../common'

export const text2MusicBlock: Block = {
  id: Endpoint.Text2Music,
  endpointName: Endpoint.Text2Music,
  name: 'Generate music',
  inputModality: [{ modality: Modality.Text }],
  outputModality: Modality.Audio,
  blockParameters: text2MusicParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Text]: 'an upbeat, melodic edm',
    },
    exampleOutput: '/examples/text2music_out.wav',
    description: 'Generate music from a text prompt',
    properties: {
      maxRuntime: '21s',
    },
  },
}
