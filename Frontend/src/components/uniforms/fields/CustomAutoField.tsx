import { AutoFieldProps, connectField, useField } from 'uniforms'
import { AutoField } from 'uniforms-mui'
import { SliderNumberField } from './SliderNumberField'
import { WrapWithHelper } from '../helper-components'
import { SelectFileField } from './SelectFileField'

interface FieldDependency {
  field: string
  value: string
}

const determineComponentFromProps = (props: AutoFieldProps) => {
  const { component, fieldType, componentName } = props

  if (component) {
    return component
  }

  if (fieldType === Number) {
    return SliderNumberField
  }

  if (componentName === 'file_upload') {
    return SelectFileField
  }

  return AutoField
}

const CustomAuto = (props: AutoFieldProps) => {
  const { dependenciesToBeVisible, name } = props
  const [fieldProps, context] = useField(name, {}, { absoluteName: true })

  const dependenciesMet =
    (dependenciesToBeVisible as Array<FieldDependency>)?.every(
      ({ field, value }) => context.model[field] === value,
    ) ?? true

  if (!dependenciesMet) {
    return null
  }

  const Component = determineComponentFromProps(props)

  return props.help ? (
    <WrapWithHelper helpMessage={props.help as string}>
      <Component {...props} name='' />
    </WrapWithHelper>
  ) : (
    <Component {...props} name='' />
  )
}

export const CustomAutoField = connectField(CustomAuto, {
  initialValue: false,
})

export const CustomAutoFieldDetector = () => {
  return CustomAutoField
}
