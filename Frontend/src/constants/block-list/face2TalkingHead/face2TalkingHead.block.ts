import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { face2TalkingHeadParams } from './face2TalkingHead.params'

export const face2TalkingHeadBlock: Block = {
  id: Endpoint.Face2TalkingHead,
  endpointName: Endpoint.Face2TalkingHead,
  name: 'Animate a face to talk',
  inputModality: [
    { modality: Modality.Audio, alias: 'driven_audio' },
    { modality: Modality.Image, alias: 'source_image' },
  ],
  outputModality: Modality.Video,
  blockParameters: face2TalkingHeadParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Image]: '/examples/happy_face.jpg',
    },
    exampleOutput: '/examples/speech.wav',
    description: 'Generate a talking head video from a static face and a driving speech audio',
    properties: {
      maxRuntime: '1s',
    },
  },
}
