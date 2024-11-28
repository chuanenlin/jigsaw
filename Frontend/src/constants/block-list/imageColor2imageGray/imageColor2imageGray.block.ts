import { Block, Modality } from '../../../types'
import { onlyImageParams } from '../common'
import { Endpoint } from '../../common'

export const imageColor2ImageGrayBlock: Block = {
  id: Endpoint.ImageColor2ImageGray,
  endpointName: Endpoint.ImageColor2ImageGray,
  name: 'Color → Grayscale',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: onlyImageParams,
  blockType: 'llm',
}
