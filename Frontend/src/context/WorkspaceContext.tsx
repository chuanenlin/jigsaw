import React, { createContext, PropsWithChildren, useContext, useRef, useState } from 'react'
import Blockly from 'blockly/core'
import { Block, BlockParameters } from '../types'
import { BlockResponse, getAutoChain, makeAutoChainCall, makeBlockSearchCall } from '../api'
import { blocksList } from '../constants'
import { cloneDeep } from 'lodash'
import { AutoChainService, BlockProcessorService } from '../service'
import { enqueueSnackbar } from 'notistack'
import { parseBlockData } from './util'
import { BlocklistFilter } from '../components/block-search'

export type BlockProcessOutput = BlockResponse
export type BlockProcessInputs = Record<string, BlockProcessOutput>

export enum BlockProcessStatus {
  IDLE = 'IDLE',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
  FAILED = 'FAILED',
}

export enum RunStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
}

export enum StatusSource {
  BLOCK_PROCESSOR = 'BLOCK_PROCESSOR',
}

export interface WorkspaceStatus {
  runStatus: RunStatus
  source?: StatusSource
  message?: string
}

/**
 * Block data that is used for processing
 * @param blocklyBlock - blockly block
 * @param blockData - block data from constants
 * @param processStatus - status of the block processing
 * @param inputs - inputs of the block (output of the previous block)
 * @param output - output of the block
 */
export interface ProcessableBlock {
  blocklyBlock: Blockly.Block
  blockData: Block
  processStatus: BlockProcessStatus
  inputs?: BlockProcessInputs
  output?: BlockProcessOutput
}

interface WorkspaceContextProps {
  workspace?: Blockly.WorkspaceSvg
  setWorkspace: (workspace: Blockly.WorkspaceSvg) => void
  /**
   * Map of blockly blocks and their corresponding block data
   * This is kept to be used for processing the blocks (api calls)
   */
  processableBlocks: Map<string, ProcessableBlock>
  selectedBlocklyBlock: Blockly.Block | undefined | null
  onSelectedWorkspaceBlockChanged: (block: Blockly.Block | undefined | null) => void
  setSelectedBlocklyBlockId: (blockId: string | undefined | null) => void

  selectedProcessableBlock: ProcessableBlock | undefined
  /**
   * Sets model of the selected block in the workspaceBlocks map and update the map
   * @param block - blockly block
   * @param model - parameters model
   */
  setBlockParametersModel: (block: Blockly.Block, model: BlockParameters['model']) => void
  /**
   * Process all blocks in the workspaceBlocks map (make api calls) and updated the blocks
   * in the map with the response
   */
  processBlocks: () => Promise<void>
  cancelBlocksProcess: () => void
  /**
   * Updates the workspaceBlocks map with the corresponding blocks in the workspace
   * @param blocklyBlocks - blockly blocks in the workspace
   */
  onBlocksChanged: (blocklyBlocks: Blockly.Block[]) => void
  getSelectedBlockParameters: () => BlockParameters | undefined
  workspaceStatus: WorkspaceStatus
  onAutoChain: (prompt: string) => Promise<void>

  visibleBlockIds: Array<string>
  setVisibleBlockIds: (blockEndpoints: Array<string>) => void
  onBlockSearch: (searchPhrase: string) => Promise<void>
  setBlockFilter: (prompt: BlocklistFilter) => void
  blockFilter: BlocklistFilter | undefined
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(undefined)

export const useWorkspaceContext = () => useContext(WorkspaceContext) as WorkspaceContextProps

export const WorkspaceContextProvider = ({ children }: PropsWithChildren) => {
  const [workspace, setWorkspace] = useState<WorkspaceContextProps['workspace'] | undefined>(
    undefined,
  )

  const [selectedBlocklyBlock, setSelectedBlocklyBlock] =
    useState<WorkspaceContextProps['selectedBlocklyBlock']>(undefined)

  const [selectedProcessableBlock, setSelectedProcessableBlock] =
    useState<WorkspaceContextProps['selectedProcessableBlock']>(undefined)

  const processableBlocksRef = useRef<WorkspaceContextProps['processableBlocks']>(new Map())
  const setProcessableBlocks = (blocks: WorkspaceContextProps['processableBlocks']) => {
    processableBlocksRef.current = blocks
  }

  const selectedBlocklyBlockIdRef = useRef<string | undefined | null>()
  const setSelectedBlocklyBlockId = (blockId: string | undefined | null) => {
    selectedBlocklyBlockIdRef.current = blockId
  }

  const curBlockProcessorService = useRef<BlockProcessorService | null>()
  const setCurBlockProcessorService = (blockProcessorService: BlockProcessorService | null) => {
    curBlockProcessorService.current = blockProcessorService
  }

  const [workspaceStatus, setWorkspaceStatus] = useState<WorkspaceStatus>({
    runStatus: RunStatus.IDLE,
  })

  const [visibleBlockIds, setVisibleBlockIds] = useState(blocksList.map((block) => block.id) || [])
  const [blockFilter, setBlockFilter] = useState<BlocklistFilter>()

  /**
   * Sets model of the selected block in the workspaceBlocks map and update the map
   * @param block - blockly block
   * @param model - parameters model
   */
  const setBlockParametersModel = (block: Blockly.Block, model: BlockParameters['model']) => {
    const tempBlocks = new Map(processableBlocksRef.current)

    const blockInfo = tempBlocks.get(block.id)
    if (blockInfo) {
      blockInfo.blockData.blockParameters!.model = model
      setProcessableBlocks(tempBlocks)
    }
  }

  /**
   * Updates the workspaceBlocks map with the corresponding blocks in the workspace
   * Adds new blocks to the map as a new block is added to the workspace
   * @param blocklyBlocks - blockly blocks in the workspace
   */
  const onBlocksChanged = (blocklyBlocks: Blockly.Block[]) => {
    const processableBlocks = processableBlocksRef.current
    const newBlocks = blocklyBlocks.filter((block) => !processableBlocks.has(block.id))
    const newBlocksMap = new Map<string, ProcessableBlock>()

    const removedBlocks = Array.from(processableBlocks.keys()).filter(
      (blockId) => !blocklyBlocks.some((block) => block.id === blockId),
    )

    removedBlocks.forEach((blockId) => {
      processableBlocks.delete(blockId)
    })

    newBlocks.forEach((block) => {
      const blockDetails = blocksList.find((b) => b.name === block?.type)
      if (block && blockDetails) {
        let model: BlockParameters['model'] = {}

        /**
         * This is required for autochain.
         * If a block is added to the workspace by autochain, it already should have a model
         * and it's stored in the block.data property of the block (see {@link AutoChainService#addBlock})
         */
        if (blockDetails?.blockParameters) {
          if (!block.data) {
            model = blockDetails?.blockParameters?.model
          } else {
            // model = JSON.parse(block.data)
            model = parseBlockData(block.data).model!
          }
        }

        if (blockDetails?.blockParameters?.model) {
          blockDetails.blockParameters.model = model
        }

        newBlocksMap.set(block.id, {
          blocklyBlock: block,
          blockData: cloneDeep(blockDetails),
          processStatus: BlockProcessStatus.IDLE,
        })
      }
    })

    setProcessableBlocks(new Map([...processableBlocks, ...newBlocksMap]))
  }

  /**
   * Updates the processableBlocks map when a block is processed.
   * This is used for updating the block output and status
   * @param block - blockly block
   */
  const onBlockProcessed = (
    block: ProcessableBlock,
    blocksCount: number,
    processedBlocksCount: number,
  ) => {
    const tmpWorkspaceBlocks = new Map(processableBlocksRef.current)
    tmpWorkspaceBlocks.set(block.blocklyBlock.id, block)
    setProcessableBlocks(tmpWorkspaceBlocks)

    const message = `${processedBlocksCount + 1}/${blocksCount}: ${block.blockData.name}`

    setWorkspaceStatus({
      runStatus: RunStatus.LOADING,
      message,
      source: StatusSource.BLOCK_PROCESSOR,
    })
  }

  const processBlocks = async () => {
    if (!processableBlocksRef.current.size) {
      return
    }

    setWorkspaceStatus({ runStatus: RunStatus.LOADING, source: StatusSource.BLOCK_PROCESSOR })

    try {
      const blockProcessorService = new BlockProcessorService(onBlockProcessed)
      setCurBlockProcessorService(blockProcessorService)
      await blockProcessorService.initiateProcessing(
        processableBlocksRef.current,
        selectedBlocklyBlockIdRef.current,
      )
    } catch (error) {
      enqueueSnackbar((error as Error).message, { variant: 'error' })
    }

    setWorkspaceStatus({ runStatus: RunStatus.IDLE })
  }

  const cancelBlocksProcess = () => {
    setWorkspaceStatus({ runStatus: RunStatus.IDLE })
    curBlockProcessorService.current?.cancelProcessing()
    setCurBlockProcessorService(null)
  }

  /**
   * Returns the block parameters of the selected block (schema and model)
   * @returns block parameters
   */
  const getSelectedBlockParameters = () => {
    if (!selectedBlocklyBlock) {
      return undefined
    }

    if (processableBlocksRef.current.has(selectedBlocklyBlock.id)) {
      return processableBlocksRef.current.get(selectedBlocklyBlock.id)?.blockData.blockParameters
    }

    return blocksList.find((block) => block.name === selectedBlocklyBlock.type)?.blockParameters
  }

  const onAutoChain = async (task: string) => {
    if (!workspace) {
      return
    }

    setWorkspaceStatus({ runStatus: RunStatus.LOADING, message: 'Loading the chain' })

    try {
      const autoChainResponse = await getAutoChain(task)
      await new AutoChainService(workspace, autoChainResponse.autochain_output).autoChain()
    } catch (error) {
      enqueueSnackbar((error as Error).message, { variant: 'error' })
    }

    setWorkspaceStatus({ runStatus: RunStatus.IDLE })
  }

  const onBlockSearch = async (searchPhrase: string) => {
    if (searchPhrase.length < 1) {
      setVisibleBlockIds(blocksList.map((block) => block.id) || [])
      return
    }

    setWorkspaceStatus({ runStatus: RunStatus.LOADING, message: 'Searching for blocks' })

    try {
      const blockSearchResponse = await makeBlockSearchCall({ task: searchPhrase })

      const blockIds = blockSearchResponse.list_output.map((fn) => fn.substring(0, fn.length - 2))

      setVisibleBlockIds(blockIds)
    } catch (error) {
      enqueueSnackbar((error as Error).message, { variant: 'error' })
    }

    setWorkspaceStatus({ runStatus: RunStatus.IDLE })
  }

  const onSelectedWorkspaceBlockChanged = (block: Blockly.Block | undefined | null) => {
    if (!block) {
      setSelectedBlocklyBlock(undefined)
      setSelectedProcessableBlock(undefined)
      return
    }
    setSelectedBlocklyBlock(block)
    setSelectedProcessableBlock(processableBlocksRef.current.get(block?.id))
  }

  return (
    <WorkspaceContext.Provider
      value={{
        workspace,
        setWorkspace,
        processableBlocks: processableBlocksRef.current,
        selectedBlocklyBlock,
        selectedProcessableBlock,
        onSelectedWorkspaceBlockChanged,
        setSelectedBlocklyBlockId,
        setBlockParametersModel,
        processBlocks,
        cancelBlocksProcess,
        onBlocksChanged,
        getSelectedBlockParameters,
        onAutoChain,
        onBlockSearch,
        visibleBlockIds,
        setVisibleBlockIds,
        workspaceStatus,
        setBlockFilter,
        blockFilter,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export default WorkspaceContextProvider
