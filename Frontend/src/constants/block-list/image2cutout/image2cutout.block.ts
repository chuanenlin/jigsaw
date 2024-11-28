import { Block, Modality } from '../../../types'
import { onlyImageParams } from '../common'
import { Endpoint } from '../../common'

export const image2CutoutBlock: Block = {
  id: Endpoint.Image2Cutout,
  endpointName: Endpoint.Image2Cutout,
  name: 'Remove image background',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: onlyImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/STOP_sign.jpg',
    },
    exampleOutput: '/examples/out_cutout.png',
    description: 'Remove the background of an image',
    properties: {
      maxRuntime: '2s',
    },
  },
}
