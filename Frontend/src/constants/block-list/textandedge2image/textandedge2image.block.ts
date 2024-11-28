import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { textAndEdge2ImageParams } from './textandedge2image.params'

export const textAndEdge2ImageBlock: Block = {
  id: Endpoint.TextAndEdge2Image,
  endpointName: Endpoint.TextAndEdge2Image,
  name: 'Generate image from text and edge map',
  inputModality: [{ modality: Modality.Text }, { modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: textAndEdge2ImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/out_depth.png',
      [Modality.Text]: 'a modern building',
    },
    exampleOutput: '/examples/out_textDepth.png',
    description: 'Generate an image from a text prompt and an edge map',
    properties: {
      maxRuntime: '34s',
    },
  },
}
