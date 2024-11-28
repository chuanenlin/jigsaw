import { Block, Modality } from '../../../types'
import { text2TextParams } from './text2text.params'
import { Endpoint } from '../../common'

export const text2TextBlock: Block = {
  id: Endpoint.Text2Text,
  endpointName: Endpoint.Text2Text,
  name: 'Text glue',
  inputModality: [{ modality: Modality.Text }],
  outputModality: Modality.Text,
  blockParameters: text2TextParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Text]: 'a modern living room',
    },
    exampleOutput:
      'minimalist living room, smart sustainable furniture, ambient voice-controlled lighting',
    description:
      'Translate text into a prompt, brainstorm an idea, or perform any language-based reasoning',
    properties: {
      maxRuntime: 'Less than 30 seconds',
    },
  },
}
