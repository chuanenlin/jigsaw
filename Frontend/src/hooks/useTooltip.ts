import { useEffect, useRef } from 'react'
import { BlockSvg, WorkspaceSvg } from 'blockly/core'
import { useTooltipContext } from '../context'

export const useTooltip = () => {
  const { tooltipInfo, setTooltipInfo } = useTooltipContext()

  // We need these refs to be able to access tooltipInfo in the mouseenter and mouseleave
  // listeners, otherwise they will be undefined because of the closure of tooltipInfo.
  const tooltipInfoRef = useRef(tooltipInfo)
  const setTooltipInfoRef = useRef(setTooltipInfo)

  useEffect(() => {
    tooltipInfoRef.current = tooltipInfo
    setTooltipInfoRef.current = setTooltipInfo
  }, [tooltipInfo, setTooltipInfo])

  const setupTooltipListeners = (workspace?: WorkspaceSvg) => {
    if (!workspace) {
      return
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const toolboxBlocks = workspace.getFlyout()?.getBlocks()
    for (const block of toolboxBlocks as Array<BlockSvg>) {
      block.getSvgRoot().addEventListener('mouseenter', async (event: MouseEvent) => {
        ;(event.target as SVGGElement).classList.add('tooltip-opened')
        await new Promise((resolve) => setTimeout(resolve, 400))

        if ((event.target as SVGGElement).classList.contains('tooltip-opened')) {
          setTooltipInfoRef.current({ blockSvg: block, event, tooltipHovered: false })
        }
      })

      block.getSvgRoot().addEventListener('mouseleave', async (event: MouseEvent) => {
        ;(event.target as SVGGElement).classList.remove('tooltip-opened')
        await new Promise((resolve) => setTimeout(resolve, 300))
        if (tooltipInfoRef.current?.tooltipHovered) {
          return
        }

        setTooltipInfoRef.current(undefined)
      })
    }
  }

  const onMouseOverTooltipComponent = () => {
    setTooltipInfoRef.current({ ...tooltipInfo, tooltipHovered: true })
  }

  const onMouseLeaveTooltipComponent = () => {
    setTooltipInfoRef.current(undefined)
  }

  return {
    setupTooltipListeners,
    onMouseLeaveTooltipComponent,
    onMouseOverTooltipComponent,
    tooltipInfo: tooltipInfoRef.current,
    setTooltipInfo: setTooltipInfoRef.current,
  }
}
