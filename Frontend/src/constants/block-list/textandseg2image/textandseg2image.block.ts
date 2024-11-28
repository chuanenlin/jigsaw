import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { textAndSeg2ImageParams } from './textandseg2image.params'

export const textAndSeg2ImageBlock: Block = {
  id: Endpoint.TextAndSeg2Image,
  endpointName: Endpoint.TextAndSeg2Image,
  name: 'Generate image from text and segmentation map',
  inputModality: [{ modality: Modality.Text }, { modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: textAndSeg2ImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/dog.jpg',
      [Modality.Text]: 'corgi, photorealistic, 4k',
    },
    exampleOutput: '/examples/out_text_seg2img.png',
    description: 'Generate an image from a text prompt and a segmentation map',
    properties: {
      maxRuntime: '4s',
    },
  },
}
