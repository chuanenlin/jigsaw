import { Block, Modality } from '../../../types'
import { image2superImageParams } from './image2superImage.params'
import { Endpoint } from '../../common'

export const image2SuperImageBlock: Block = {
  id: Endpoint.Image2SuperImage,
  endpointName: Endpoint.Image2SuperImage,
  name: 'Increase image resolution',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: image2superImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/low_res_cat.jpg',
    },
    exampleOutput: '/examples/output_cat.jpg',
    description: 'Improve the resolution of an image',
    properties: {
      maxRuntime: '1s',
    },
  },
}
