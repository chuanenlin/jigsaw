import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Modality } from '../../types'
import { enqueueSnackbar } from 'notistack'
import { SelectedFile } from '../../api'

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 16,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  width: '50%',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

interface DropZoneProps {
  accepted: string[]
  onDrop: (selectedFile: SelectedFile) => void
  modality: Modality
}

export const DropZone = ({ accepted, onDrop, modality }: DropZoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    multiple: false,
    accept: {
      [`${modality.toLowerCase()}/*`]: accepted,
    },
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        enqueueSnackbar(`File type not supported ${fileRejections[0].file.type}`, {
          variant: 'error',
        })
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(acceptedFiles[0])
      reader.onload = () =>
        onDrop({ name: acceptedFiles[0].name, content: reader.result as string })
    },
  })

  return (
    <section className='container flex justify-center items-center'>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p style={{ textAlign: 'center', fontSize: '18px' }}>
          Drag & drop file (supported file formats: {accepted.join(', ')})
        </p>
      </div>
    </section>
  )
}
