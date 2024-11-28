import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'

export const video2SuperVideoBlock: Block = {
  id: Endpoint.Video2SuperVideo,
  endpointName: Endpoint.Video2SuperVideo,
  name: 'Increase video resolution',
  inputModality: [{ modality: Modality.Video }],
  outputModality: Modality.Video,
  blockType: 'llm',
}
