import Ajv from 'ajv'
import { SomeJSONSchema } from 'ajv/dist/types/json-schema'

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  keywords: ['uniforms'],
})

export const createValidator = (schema: SomeJSONSchema) => {
  const validator = ajv.compile(schema)

  return (model: Record<string, unknown>) => {
    validator(model)
    return validator.errors?.length ? { details: validator.errors } : null
  }
}
