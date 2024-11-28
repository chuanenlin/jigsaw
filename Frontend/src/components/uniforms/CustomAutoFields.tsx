import { Fragment, createElement } from 'react'
import { useForm } from 'uniforms'
import { CustomAutoField } from './fields'
import { AutoFieldsProps } from 'uniforms-mui'

export const CustomAutoFields = ({
  element = Fragment,
  fields,
  omitFields = [],
  showInlineError,
  ...props
}: AutoFieldsProps) => {
  const { schema } = useForm()

  return createElement(
    element,
    props,
    (fields ?? schema.getSubfields())
      .filter((field) => !omitFields.includes(field))
      .map((field) =>
        createElement(
          CustomAutoField,
          Object.assign(
            { key: field, name: field },
            showInlineError === undefined ? null : { showInlineError },
          ),
        ),
      ),
  )
}
