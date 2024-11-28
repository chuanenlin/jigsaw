import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'

export const video2CutoutBlock: Block = {
  id: Endpoint.Video2Cutout,
  endpointName: Endpoint.Video2Cutout,
  name: 'Remove video background',
  inputModality: [{ modality: Modality.Video }],
  outputModality: Modality.Video,
  blockType: 'llm',
}
