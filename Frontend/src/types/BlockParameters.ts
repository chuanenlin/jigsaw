import { SomeJSONSchema } from 'ajv/dist/types/json-schema'
import { UnknownObject } from 'uniforms'

export interface BlockParameters {
  schema: SomeJSONSchema
  model: UnknownObject
}
