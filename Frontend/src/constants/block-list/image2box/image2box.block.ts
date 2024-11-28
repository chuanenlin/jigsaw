import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'

export const image2BoxBlock: Block = {
  id: Endpoint.Image2Box,
  endpointName: Endpoint.Image2Box,
  name: 'Detect objects',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Image,
  // blockParameters: image2BoxParams,
  blockType: 'llm',
}
