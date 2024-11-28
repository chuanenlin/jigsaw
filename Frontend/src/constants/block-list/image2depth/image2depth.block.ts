import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { onlyImageParams } from '../common'

export const image2DepthBlock: Block = {
  id: Endpoint.Image2Depth,
  endpointName: Endpoint.Image2Depth,
  name: 'Get depth map',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: onlyImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/house.png',
    },
    exampleOutput: '/examples/out_depth.png',
    description:
      'Translate an image to a depth map to represent the image’s overall structure and relative distance from the camera',
    properties: {
      maxRuntime: '3s',
    },
  },
}
