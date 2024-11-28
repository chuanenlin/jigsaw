import { Block, Modality } from '../../types'
import { Stack } from '@mui/material'
import { DummyBlockMeta } from '../../constants'
import { useTooltip } from '../../hooks/useTooltip'
import { useTooltipContext } from '../../context'
import { MediaViewerContainer } from './MediaViewerContainer'

export const Tooltip = () => {
  const { tooltipInfo } = useTooltipContext()
  const { onMouseOverTooltipComponent, onMouseLeaveTooltipComponent } = useTooltip()

  if (!tooltipInfo?.blockSvg || !tooltipInfo.event) return null

  const block = JSON.parse(tooltipInfo.blockSvg.data ?? '').block as Block | undefined
  if (!block || block.blockType === 'input') return null

  const meta = block.meta ?? DummyBlockMeta
  
  return (
    <Stack
      direction="column"
      className="tooltip-container"
      style={{
        position: 'fixed',
        width: 320,
        top: tooltipInfo.event.clientY + 10,
        left: tooltipInfo.event.clientX + 10,
        zIndex: 10000,
      }}
      onMouseEnter={onMouseOverTooltipComponent}
      onMouseLeave={onMouseLeaveTooltipComponent}
    >
      <div className="tooltip-content">
        <h3 className="tooltip-section-title">Description</h3>
        <p className="tooltip-text">{meta.description}</p>

        <h3 className="tooltip-section-title">Runtime</h3>
        <p className="tooltip-text">{meta.properties?.maxRuntime}</p>

        <h3 className="tooltip-section-title">Example input</h3>
        <div className="tooltip-examples">
          {Object.entries(meta.exampleInput ?? {}).map(([modality, content], index) => (
            Array.isArray(content) ? (
              <div key={index} className="flex flex-col gap-2">
                {content.map((c, i) => (
                  <MediaViewerContainer key={i} content={c} modality={modality as Modality} />
                ))}
              </div>
            ) : (
              <MediaViewerContainer key={index} content={content} modality={modality as Modality} />
            )
          ))}
        </div>

        <h3 className="tooltip-section-title">Example output</h3>
        <div className="tooltip-examples">
          <MediaViewerContainer
            modality={block.outputModality}
            content={meta.exampleOutput || ''}
          />
        </div>
      </div>
    </Stack>
  )
}
