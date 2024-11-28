import { Block, Modality } from '../../../types'
import { text2ImageParams } from './text2image.params'
import { Endpoint } from '../../common'

export const text2ImageBlock: Block = {
  id: Endpoint.Text2Img,
  endpointName: Endpoint.Text2Img,
  name: 'Generate image',
  inputModality: [{ modality: Modality.Text }],
  outputModality: Modality.Image,
  blockParameters: text2ImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Text]: 'an avocado chair',
    },
    exampleOutput: '/examples/out-0.png',
    description: 'Generate an image from a text prompt',
    properties: {
      maxRuntime: 'Less than 30 seconds',
    },
  },
}
