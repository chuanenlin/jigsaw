import { BlockParameters } from './BlockParameters'
import { Modality } from './Modality'
import { Endpoint } from '../constants'
import { UnknownObject } from 'uniforms'

type BlockType = 'input' | 'output' | 'llm'

/**
 * In order to work with multiple inputs of the same modality, we need to give them aliases.
 * The alias is the key that is used when making the API call.
 */
interface InputModality {
  modality: Modality
  alias?: string
}

export interface Block {
  id: string
  inputModality: Array<InputModality>
  outputModality: Modality
  name: string
  endpointName?: Endpoint
  blockParameters?: BlockParameters
  blockType: BlockType
  meta?: BlockMeta
}

export interface BlockProperties {
  maxRuntime?: string
  hardwareRequirements?: {
    gpu?: number
    cpu?: number
    ram?: number
  }
}

export interface BlockMeta {
  description?: string
  exampleInput?: {
    [key: string]: string | Array<string>
  }
  exampleOutput?: string
  properties?: BlockProperties
}

export interface BlockData {
  model?: UnknownObject
  block: Block
}
