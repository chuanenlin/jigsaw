import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { onlyImageParams } from '../common'

export const image2CharacterBlock: Block = {
  id: Endpoint.Image2Character,
  endpointName: Endpoint.Image2Character,
  name: 'Extract text in image',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Text,
  blockParameters: onlyImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/receipt.jpg',
    },
    // TODO: it's json in the shared document
    exampleOutput: '',
    description: 'Recognize text characters in an image',
    properties: {
      maxRuntime: '3s',
    },
  },
}
