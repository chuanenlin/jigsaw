import { Block, Modality } from '../../../types'
import { onlyImageParams } from '../common'
import { Endpoint } from '../../common'

export const image2TextBlock: Block = {
  id: Endpoint.Image2Text,
  endpointName: Endpoint.Image2Text,
  name: 'Caption image',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Text,
  blockParameters: onlyImageParams,
  blockType: 'llm',
  meta: {
    description: 'Describe the contents of an image with a descriptive sentence',
    exampleInput: {
      [Modality.Image]: '/examples/bag.png',
    },
    exampleOutput: 'a brown backpack',
    properties: {
      maxRuntime: '1s',
    },
  },
}
