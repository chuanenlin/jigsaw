import { Block, Modality } from '../../../types'
import { Endpoint } from '../../common'
import { textAndSketch2ArtParams } from './textandsketch2art.params'

export const textAndSketch2ArtBlock: Block = {
  id: Endpoint.TextAndSketch2Art,
  endpointName: Endpoint.TextAndSketch2Art,
  name: 'Generate artwork from text and sketch',
  inputModality: [{ modality: Modality.Text }, { modality: Modality.Sketch }],
  outputModality: Modality.Image,
  blockParameters: textAndSketch2ArtParams,
  blockType: 'llm',
  meta: {
    exampleInput: {
      [Modality.Text]: 'a futuristic toyota, flat design',
      [Modality.Image]: '/examples/sketch.jpg',
    },
    exampleOutput: '/examples/out_text_sketch2art.png',
    description: 'Generate artwork from a text prompt and a reference sketch',
    properties: {
      maxRuntime: '12s',
    },
  },
}
