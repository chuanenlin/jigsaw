import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { textAndSketch2ImageParams } from './textandsketch2image.params'

export const textAndSketch2ImageBlock: Block = {
  id: Endpoint.TextAndSketch2Image,
  endpointName: Endpoint.TextAndSketch2Image,
  name: 'Generate image from text and sketch',
  inputModality: [{ modality: Modality.Text }, { modality: Modality.Sketch }],
  outputModality: Modality.Image,
  blockParameters: textAndSketch2ImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Text]: ' a futuristic toyota, flat design',
      [Modality.Sketch]: '/examples/sketch.jpg',
    },
    exampleOutput: '/examples/out_text_sketch2img.png',
    description: 'Generate an image from a text prompt and a reference sketch',
    properties: {
      maxRuntime: '35s',
    },
  },
}
