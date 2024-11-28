import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { textAndPose2ImageParams } from './textandpose2image.params'

export const textandPose2ImageBlock: Block = {
  id: Endpoint.TextAndPose2Image,
  endpointName: Endpoint.TextAndPose2Image,
  name: 'Generate image from text and human pose',
  inputModality: [{ modality: Modality.Text }, { modality: Modality.Image }],
  outputModality: Modality.Image,
  blockParameters: textAndPose2ImageParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/out_pose.png',
      [Modality.Text]: 'a woman standing',
    },
    exampleOutput: '/examples/out_textPose.png',
    description: 'Generate an image from a text prompt and a human pose',
    properties: {
      maxRuntime: '3s',
    },
  },
}
