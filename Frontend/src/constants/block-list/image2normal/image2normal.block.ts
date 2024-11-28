import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { onlyImageParams } from '../common'

export const image2NormalBlock: Block = {
  id: Endpoint.Image2Normal,
  endpointName: Endpoint.Image2Normal,
  name: 'Get normal map',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: onlyImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/bag.png',
    },
    exampleOutput: '/examples/out_normal.png',
    description: 'Translate an image to a normal map to represent the image’s overall structure',
    properties: {
      maxRuntime: '3s',
    },
  },
}
