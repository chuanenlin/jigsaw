import { styled, TextField } from '@mui/material'

export interface InputBoxProps {
  value?: string
  className?: string
  startAdornment?: React.ReactNode
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  multiline?: boolean
}

const RoundedInput = styled(TextField)(() => ({
  background: '#F2F2F7',
  border: '1px solid #8E8E93',
  borderRadius: '30px',
  '& .MuiInputBase-root': {
    height: '100%',
    padding: 0,
    paddingLeft: '10px',
  },
  '& input': {
    paddingLeft: '30px',
  },
  '& fieldset': {
    borderRadius: '30px',
    border: 'none',
  },
}))

const InputBox = ({
  value,
  className,
  startAdornment,
  onChange,
  placeholder,
  multiline,
}: InputBoxProps) => {
  return (
    <RoundedInput
      fullWidth
      multiline={multiline}
      maxRows={4}
      value={value}
      InputProps={{ startAdornment }}
      className={className}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default InputBox
