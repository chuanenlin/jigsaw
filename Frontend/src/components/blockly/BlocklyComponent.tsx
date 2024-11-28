import { Box } from '@mui/material'
import 'blockly/blocks'
import Blockly from 'blockly/core'
import { useEffect, useMemo, useRef } from 'react'
import { initCustomBlocks } from './blocks/init-custom-blocks'
import { blocksList, modalityColors } from '../../constants'
import { Modality } from '../../types'
import { ChildBasedDragger, registerCustomClasses } from './custom'
import { overrideBlockly } from './blockly-overrides'
import { useWorkspaceContext } from '../../context'
import { BlocklistFilter } from '../block-search'
import { ContinuousFlyout, ContinuousMetrics, ContinuousToolbox } from './continuous-toolbox'
import { useTooltip } from '../../hooks/useTooltip'
import { extractBlockRuntimeValueAndUnit } from './util'
import styled from '@emotion/styled'

const modalityValues = Object.values(Modality)

const getBlocks = (
  modalityFilter: Modality,
  visibleBlockIds: Array<string>,
  blockFilter: BlocklistFilter | undefined,
) => {
  return blocksList
    .filter(
      (block) =>
        block.inputModality.some((inputModality) => inputModality.modality === modalityFilter) &&
        visibleBlockIds.includes(block.id),
    )
    .filter((block) => {
      const blockRuntime = extractBlockRuntimeValueAndUnit(
        block.meta?.properties?.maxRuntime,
      ).runtime
      const allowedMaxRuntime = blockFilter?.maxRuntine

      if (!allowedMaxRuntime) return true

      return blockRuntime <= allowedMaxRuntime
    })
    .map((block) => {
      const b = {
        kind: 'block',
        type: block.name,
      }

      return [b /* , blockLabel */]
    })
    .flat()
}

const BlocklyContainer = styled(Box)(({ theme }) => ({
  '& .blocklyMainBackground': {
    stroke: 'none',
    fill: '#f8fafc',
  },
  '& .blocklyToolboxDiv': {
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e2e8f0',
    boxShadow: '4px 0 6px rgba(0, 0, 0, 0.05)',
  },
  '& .blocklyTreeRow': {
    padding: '8px 16px',
    margin: '4px 0',
    borderRadius: '8px',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f1f5f9',
    }
  }
}));

export const BlocklyComponent = () => {
  const primaryWorkSpace = useRef<Blockly.WorkspaceSvg>()
  const ref = useRef<Element | string>('')
  const workspaceXml = useRef('<xml xmlns="http://www.w3.org/1999/xhtml"></xml>')

  const {
    setWorkspace,
    onSelectedWorkspaceBlockChanged,
    onBlocksChanged,
    setSelectedBlocklyBlockId,
    blockFilter,
    visibleBlockIds,
  } = useWorkspaceContext()

  const { setupTooltipListeners } = useTooltip()

  const toolboxContent: Blockly.utils.toolbox.ToolboxDefinition = useMemo(
    () => ({
      contents: modalityValues.map((modality) => ({
        kind: 'category',
        name: modality,
        colour: modalityColors[modality],
        contents: getBlocks(modality, visibleBlockIds, blockFilter),
      })),
    }),
    [visibleBlockIds, blockFilter],
  )

  useEffect(() => {
    primaryWorkSpace.current?.updateToolbox(toolboxContent)
    primaryWorkSpace.current?.refreshToolboxSelection()
    // Has to update the listeners when the toolbox content is changed
    setupTooltipListeners(primaryWorkSpace.current)
  }, [toolboxContent])

  const options: Blockly.BlocklyOptions = {
    renderer: 'custom_renderer',
    rtl: false,
    toolboxPosition: 'start',
    toolbox: toolboxContent,
    move: {
      scrollbars: true,
      drag: true,
    },
    theme: 'custom_theme',
    trashcan: true,
    disable: true,
    zoom: {
      wheel: true,
      controls: false,
    },
    plugins: {
      toolbox: ContinuousToolbox,
      flyoutsVerticalToolbox: ContinuousFlyout,
      metricsManager: ContinuousMetrics,
      blockDragger: ChildBasedDragger,
    },
  }

  useEffect(() => {
    initCustomBlocks()
    overrideBlockly()
    const unregisterCustomClasses = registerCustomClasses()
    return () => {
      unregisterCustomClasses()
    }
  })

  useEffect(() => {
    primaryWorkSpace.current = Blockly.inject(ref.current, options)
    setupTooltipListeners(primaryWorkSpace.current)

    const handleChangeEvent = (event: {
      type: string
      newElementId: string | undefined
      blockId: string
      targetType: string
    }) => {
      if (!primaryWorkSpace.current) {
        return
      }

      const workspace = primaryWorkSpace.current

      if (event.type === Blockly.Events.SELECTED) {
        const selectedBlocklyBlock = event.newElementId
          ? workspace.getBlockById(event.newElementId)
          : undefined

        onSelectedWorkspaceBlockChanged(selectedBlocklyBlock)
        setSelectedBlocklyBlockId(selectedBlocklyBlock?.id)
      }

      if (
        event.type === Blockly.Events.BLOCK_CREATE ||
        event.type === Blockly.Events.BLOCK_DELETE
      ) {
        onBlocksChanged(workspace.getAllBlocks(false))
      }

      /**
       * Somehow the custom dragger messes up setting the selected class on blocks
       * so we have to do it manually.
       */
      if (event.type === Blockly.Events.CLICK) {
        // Remove selected class from all blocks
        workspace.getAllBlocks(false).forEach((block) => {
          block.getSvgRoot().classList.remove('blocklySelected')
        })

        // Add selected class only if a block is clicked (not the workspace)
        if (event.targetType === 'block') {
          workspace.getBlockById(event.blockId)?.getSvgRoot().classList.add('blocklySelected')
          Blockly.Events.fire(new Blockly.Events.Selected(null, event.blockId, workspace.id))
        }
      }
    }

    if (primaryWorkSpace.current) {
      primaryWorkSpace.current.addChangeListener(handleChangeEvent)

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      primaryWorkSpace.current.showContextMenu = () => {}
      setWorkspace(primaryWorkSpace.current)

      if (workspaceXml.current) {
        Blockly.Xml.domToWorkspace(
          Blockly.utils.xml.textToDom(workspaceXml.current),
          primaryWorkSpace.current,
        )
      }
    }

    return () => {
      if (primaryWorkSpace.current) {
        primaryWorkSpace.current.removeChangeListener(handleChangeEvent)
      }
    }
  }, [workspaceXml])

  return <Box className='h-full w-full' ref={ref}></Box>
}
