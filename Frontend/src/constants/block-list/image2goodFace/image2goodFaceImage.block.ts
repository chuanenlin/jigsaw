import { Block, Modality } from '../../../types'
import { image2GoodFaceImageParams } from './image2goodFaceImage.params'
import { Endpoint } from '../../common'

export const image2GoodFaceImageBlock: Block = {
  id: Endpoint.Image2GoodFaceImage,
  endpointName: Endpoint.Image2GoodFaceImage,
  name: 'Restore distorted face',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: image2GoodFaceImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/eminem.jpg',
    },
    exampleOutput: '/examples/out_img2goodface.jpg',
    description: 'Restore a distorted or low quality face',
    properties: {
      maxRuntime: '2s',
    },
  },
}
