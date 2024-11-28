import { Block, Modality } from '../../../types'
import { text2VideoParams } from './text2video.params'
import { Endpoint } from '../../common'

export const text2VideoBlock: Block = {
  id: Endpoint.Text2Video,
  endpointName: Endpoint.Text2Video,
  name: 'Generate video',
  inputModality: [{ modality: Modality.Text }],
  outputModality: Modality.Video,
  blockParameters: text2VideoParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Text]: 'a teddy bear dancing in times square',
    },
    exampleOutput: '/examples/teddy.mp4',
    description: 'Generate a video from a text prompt',
    properties: {
      maxRuntime: 'Around 1 minute',
    },
  },
}
