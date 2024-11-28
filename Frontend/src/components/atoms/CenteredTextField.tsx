import { TextField, TextFieldProps } from '@mui/material'
import { useRef, useState } from 'react'

type CenteredTextField = TextFieldProps

export const CenteredTextField = (props: CenteredTextField) => {
  const [overflow, setOverflow] = useState(false)
  const textFieldRef = useRef<HTMLDivElement>(null)

  const detectOverflow = () => {
    const element = textFieldRef.current

    if (!element) {
      return
    }

    const isOverflowing = element.scrollHeight > element.clientHeight
    setOverflow(isOverflowing)

    if (isOverflowing) {
      element.scrollTop = element.scrollHeight
    }
  }

  return (
    <TextField
      {...props}
      inputProps={{ style: { textAlign: 'center', overflow: 'auto' } }}
      ref={textFieldRef}
      InputProps={{ disableUnderline: true }}
      minRows={1}
      onChange={(event) => {
        detectOverflow()
        props.onChange?.(event)
      }}
      sx={{
        '& .MuiInputBase-input.Mui-disabled': {
          WebkitTextFillColor: '#000000',
        },
        '&.MuiFormControl-root': {
          height: '100%',
        },

        '& .MuiInputBase-root': {
          display: 'flex',
          alignItems: overflow ? 'flex-start' : 'center', // Align text to top when overflowing
          height: '100%', // Adjust the height as required
        },
      }}
      variant='standard'
    />
  )
}
