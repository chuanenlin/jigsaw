import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { textAndDepth2ImageParams } from './textanddepth2image.params'

export const textAndDepth2ImageBlock: Block = {
  id: Endpoint.TextAndDepth2Image,
  endpointName: Endpoint.TextAndDepth2Image,
  name: 'Generate image from text and depth map',
  inputModality: [{ modality: Modality.Text }, { modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: textAndDepth2ImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/out_depth.png',
      [Modality.Text]: 'a modern building',
    },
    exampleOutput: '/examples/out_textDepth.png',
    description: 'Generate an image from a text prompt and a depth map.',
    properties: {
      maxRuntime: '2s',
    },
  },
}
