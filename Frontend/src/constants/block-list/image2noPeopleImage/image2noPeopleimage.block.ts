import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { onlyImageParams } from '../common'

export const image2NoPeopleImageBlock: Block = {
  id: Endpoint.Image2NoPeopleImage,
  endpointName: Endpoint.Image2NoPeopleImage,
  name: 'Remove people',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: onlyImageParams,
  blockType: 'llm',
  meta: {
    description: 'Remove the people from an image',
  },
}
