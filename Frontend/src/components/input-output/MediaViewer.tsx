import { Typography } from '@mui/material'
import { useState } from 'react'
import { Modality } from '../../types'
import { CenteredTextField } from '../atoms'

interface MediaViewerProps {
  content?: string
  modality?: Modality
  onMediaModified?: (newContent: string) => void
  modifiable?: boolean
  key?: string
  centerTextView?: boolean
}

export const MediaViewer = ({
  content,
  modality,
  onMediaModified,
  modifiable,
  centerTextView = true,
  key,
}: MediaViewerProps) => {
  const [textContent, setTextContent] = useState(content)
  const handleContentChange = (newContent: string) => {
    setTextContent(newContent)
    onMediaModified?.(newContent)
  }

  switch (modality) {
    case Modality.Image:
      return (
        <img
          className='object-contain'
          src={content}
          alt={'temp'}
          style={{
            width: '100%',
            height: '100%',
            fontSize: '15px !important',
          }}
        />
      )
    case Modality.Text:
      return (
        <div className={`w-full h-full box-border ${centerTextView && 'p-3'}`}>
          <div className='w-full h-full overflow-auto'>
            {!modifiable ? (
              <Typography
                className={`h-full w-full ${
                  centerTextView && 'flex items-center justify-center text-center'
                }`}
              >
                {textContent}
              </Typography>
            ) : (
              <CenteredTextField
                placeholder='Write text'
                key={key}
                multiline
                fullWidth
                value={textContent}
                minRows={1}
                onChange={(event) => {
                  handleContentChange(event.target.value)
                }}
              />
            )}
          </div>
        </div>
      )
    case Modality.Audio:
      return (
        <audio
          src={content}
          controls
          style={{
            width: '100%',
            height: '100%',
          }}
        ></audio>
      )
    case Modality.Video:
      return (
        <video
          className='object-contain'
          src={content}
          controls
          style={{
            width: '100%',
            height: '100%',
          }}
        ></video>
      )
    default:
      return <Typography variant='h5'></Typography>
  }
}
