import { FieldProps, connectField } from 'uniforms'
import { TextFieldProps } from 'uniforms-mui'
import { Button, styled } from '@mui/material'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { SelectedFile } from '../../../api'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

type SelectFileFieldProps = FieldProps<SelectedFile, TextFieldProps>

const SelectFile = ({ label, onChange }: SelectFileFieldProps) => {
  return (
    <div className='w-full h-full flex flex-col pt-2 pb-2'>
      <Button component='label' variant='outlined' startIcon={<CloudUploadIcon />}>
        {label}
        <VisuallyHiddenInput
          onChange={(inputEvent) => {
            const files = inputEvent.target.files
            if (files && files[0]) {
              onChange({
                content: URL.createObjectURL(files[0]),
                name: files[0].name,
              })
            }
          }}
          type='file'
        />
      </Button>
    </div>
  )
}

export const SelectFileField = connectField(SelectFile)
