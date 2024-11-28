import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'

export const video2SmoothVideoBlock: Block = {
  id: Endpoint.Video2SmoothVideo,
  endpointName: Endpoint.Video2SmoothVideo,
  name: 'Increase video frame rate',
  inputModality: [{ modality: Modality.Video }],
  outputModality: Modality.Video,
  blockType: 'llm',
}
