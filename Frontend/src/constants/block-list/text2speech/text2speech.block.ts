import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { onlyPromptParams } from '../common'

export const text2SpeechBlock: Block = {
  id: Endpoint.Text2Speech,
  endpointName: Endpoint.Text2Speech,
  name: 'Generate speech',
  inputModality: [{ modality: Modality.Text }],
  outputModality: Modality.Audio,
  blockParameters: onlyPromptParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Text]: 'the octopus and oliver went to the opera in october',
    },
    exampleOutput: '/examples/out_text2speech.wav',
    description: 'Generate spoken audio from text',
    properties: {
      maxRuntime: '129s',
    },
  },
}
