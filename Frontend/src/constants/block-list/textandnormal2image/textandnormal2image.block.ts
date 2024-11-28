import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { textAndNormal2ImageParams } from './textandnormal2image.params'

export const textAndNormal2ImageBlock: Block = {
  id: Endpoint.TextAndNormal2Image,
  endpointName: Endpoint.TextAndNormal2Image,
  name: 'Generate image from text and normal map',
  inputModality: [{ modality: Modality.Text }, { modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: textAndNormal2ImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/out_normal.png',
      [Modality.Text]: 'a blue bag',
    },
    exampleOutput: '/examples/out_textNormal.png',
    description: 'Generate an image from a text prompt and a normal map',
    properties: {
      maxRuntime: '2s',
    },
  },
}
