import React, { useMemo } from 'react'
import { AutoForm } from 'uniforms-mui'
import { createValidator } from './createValidator'
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'
import { UnknownObject } from 'uniforms'
import { SomeJSONSchema } from 'ajv/dist/types/json-schema'
import { CustomAutoFields } from '../components/uniforms'

interface CreateFormProps<T extends UnknownObject> {
  schema: SomeJSONSchema
  onSubmit: (model: T) => void
  model: T
  showInlineError?: boolean
}

export const CreateForm = <T extends UnknownObject>({
  schema,
  onSubmit,
  model,
  showInlineError = true,
}: CreateFormProps<T>) => {
  const validator = useMemo(() => createValidator(schema), [schema])
  const bridge = useMemo(() => new JSONSchemaBridge(schema, validator), [validator])

  return (
    <AutoForm
      label={true}
      schema={bridge}
      onSubmit={onSubmit}
      model={model}
      showInlineError={showInlineError}
      autosave
      autosaveDelay={300}
    >
      <CustomAutoFields />
    </AutoForm>
  )
}
