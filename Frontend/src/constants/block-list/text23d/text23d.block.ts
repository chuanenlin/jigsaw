import { Block, Modality } from '../../../types'
import { text23dParams } from './text23d.params'
import { Endpoint } from '../../common'

export const text23dBlock: Block = {
  id: Endpoint.Text23D,
  endpointName: Endpoint.Text23D,
  name: 'Generate 3D model',
  inputModality: [{ modality: Modality.Text }],
  outputModality: Modality.ThreeDimentional,
  blockParameters: text23dParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Text]: 'a toy car',
    },
    exampleOutput: '/examples/mesh-0.obj',
    description: 'Generate a 3D model from a text prompt',
    properties: {
      maxRuntime: 'Around 5 minutes',
    },
  },
}
