import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { imageAndText2ImageParams } from './imageandtext2image.params'

export const imageandText2ImageBlock: Block = {
  id: Endpoint.ImageAndText2Image,
  endpointName: Endpoint.ImageAndText2Image,
  name: 'Generate image from text and driving image',
  inputModality: [{ modality: Modality.Text }, { modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: imageAndText2ImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/dog.jpg',
      [Modality.Text]: 'corgi',
    },
    exampleOutput: '/examples/out_textandimg2img.png',
    description: 'Generate an image based on a text prompt and reference image',
    properties: {
      maxRuntime: '29s',
    },
  },
}
