import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'

export const video2TextBlock: Block = {
  id: Endpoint.Video2Text,
  endpointName: Endpoint.Video2Text,
  name: 'Classify video',
  inputModality: [{ modality: Modality.Video }],
  outputModality: Modality.Text,
  blockType: 'llm',
}
