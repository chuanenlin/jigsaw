import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { onlyImageParams } from '../common'

export const image2PoseBlock: Block = {
  id: Endpoint.Image2Pose,
  endpointName: Endpoint.Image2Pose,
  name: 'Get human pose',
  inputModality: [{ modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: onlyImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/person.png',
    },
    exampleOutput: '/examples/out_pose.png',
    description:
      'Translate an image to a human pose map to represent the posture of the human subject',
    properties: {
      maxRuntime: '35s',
    },
  },
}
