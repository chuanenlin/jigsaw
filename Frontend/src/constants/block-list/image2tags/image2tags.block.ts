import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { onlyImageParams } from '../common'

export const image2TagsBlock: Block = {
  id: Endpoint.Image2Tags,
  endpointName: Endpoint.Image2Tags,
  name: 'Tag image',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Text,
  blockParameters: onlyImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/cafe.jpg',
    },
    exampleOutput: 'cafe, canteen, coffee shop, table, restaurant, food, person, sit, stand, stool',
    description:
      'Generate text labels that describe the contents of an image, such as objects, activities, and location',
    properties: {
      maxRuntime: '20s',
    },
  },
}
