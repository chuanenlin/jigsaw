import { JSONSchemaType } from 'ajv'
import { BlockParameters } from '../../../types'

export interface OnlyPromptParams {
  prompt: string
}

export const onlyPromptParams: BlockParameters = {
  model: {},
  schema: {} as JSONSchemaType<Omit<OnlyPromptParams, 'prompt'>>,
}
