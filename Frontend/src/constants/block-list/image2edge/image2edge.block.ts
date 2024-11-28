import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { onlyImageParams } from '../common'

export const image2EdgeBlock: Block = {
  id: Endpoint.Image2Edge,
  endpointName: Endpoint.Image2Edge,
  name: 'Get edge map',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: onlyImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/bag.png',
    },
    exampleOutput: '/examples/out_edge.png',
    description: 'Translate an image into an edge map to represent the image’s dominant lines',
    properties: {
      maxRuntime: '3s',
    },
  },
}
