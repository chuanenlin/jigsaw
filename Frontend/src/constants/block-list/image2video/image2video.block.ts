import { Block, Modality } from '../../../types'
import { image2VideoParams } from './image2video.params'
import { Endpoint } from '../../common'

export const image2VideoBlock: Block = {
  id: Endpoint.Image2Video,
  endpointName: Endpoint.Image2Video,
  name: 'Generate video from image',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Video,
  blockParameters: image2VideoParams,
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
