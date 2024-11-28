import { Modality } from '../../types'
import { MediaViewer } from '../input-output'

interface MediaViewerContainerProps {
  modality: Modality
  content: string
}

export const MediaViewerContainer = ({ modality, content }: MediaViewerContainerProps) => {
  return (
    <div
      style={{
        height: modality === Modality.Text ? undefined : modality === Modality.Audio ? 50 : 100,
        width: '100%',
        maxWidth: '100%',
        fontSize: '15px !important',
      }}
    >
      <MediaViewer
        content={content}
        modifiable={false}
        modality={modality as Modality}
        centerTextView={false}
      />
    </div>
  )
}
