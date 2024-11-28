import { FieldProps, connectField } from 'uniforms'
import { NumFieldProps } from 'uniforms-mui'
import { InputSlider } from './InputSlider'

type SliderNumberFieldProps = FieldProps<number, NumFieldProps>

const SliderNumber = ({
  label,
  onChange,
  value,
  min,
  max,
  decimal,
  step,
}: SliderNumberFieldProps) => {
  return (
    <div className='w-full h-full flex flex-col pt-2 pb-2'>
      <InputSlider
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        label={label}
        step={step || (decimal ? 0.01 : 1)}
      />
    </div>
  )
}

export const SliderNumberField = connectField(SliderNumber)
