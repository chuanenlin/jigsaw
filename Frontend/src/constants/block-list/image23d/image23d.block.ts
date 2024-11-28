import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { image23dParams } from './image23d.params'

export const image23dBlock: Block = {
  id: Endpoint.Image23d,
  endpointName: Endpoint.Image23d,
  name: 'Generate 3D model from image',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.ThreeDimentional,
  blockParameters: image23dParams,
  blockType: 'llm',
}
