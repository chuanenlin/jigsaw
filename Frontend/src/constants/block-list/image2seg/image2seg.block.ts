import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { onlyImageParams } from '../common'

export const image2SegBlock: Block = {
  id: Endpoint.Image2Seg,
  endpointName: Endpoint.Image2Seg,
  name: 'Get segmentation map',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: onlyImageParams,
  blockType: 'llm',
}
