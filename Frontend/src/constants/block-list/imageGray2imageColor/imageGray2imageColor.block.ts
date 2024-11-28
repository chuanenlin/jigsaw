import { Block, Modality } from '../../../types'
import { onlyImageParams } from '../common'
import { Endpoint } from '../../common'

export const imageGray2ImageColorBlock: Block = {
  id: Endpoint.ImageGray2ImageColor,
  endpointName: Endpoint.ImageGray2ImageColor,
  name: 'Grayscale → Color',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: onlyImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/dog_gray.jpg',
    },
    exampleOutput: '/examples/output_colorDog.png',
    description: 'Convert a grayscale image into a colorized image',
    properties: {
      maxRuntime: '6s',
    },
  },
}
