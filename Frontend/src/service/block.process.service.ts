import {
  A3dResponse,
  AudioResponse,
  blockRequestProcessors,
  BlockResponse,
  generateBlockParams,
  ImageResponse,
  InputBlockResponse,
  SelectedFile,
  TextResponse,
  transformParam,
  VideoResponse,
} from '../api'
import {
  BlockProcessInputs,
  BlockProcessStatus,
  ProcessableBlock,
} from '../context/WorkspaceContext'
import { uploadFile } from '../api/upload'
import { Modality } from '../types'
import { cached, transformNested } from '../utils'

// type ImmediatePredecessors = Map<string, ProcessableBlock>
type ImmediatePredecessors = { type: string; block: ProcessableBlock; inputAlias: string | null }

type BlockStatusCallback = (
  block: ProcessableBlock,
  blockCount: number,
  processedBlocksCount: number,
) => void

export class BlockProcessorService {
  /**
   * Callback function that is called when a block is processed.
   * This is used to update the block's process status in the UI.
   */
  private onBlockStatusChanged?: BlockStatusCallback

  private processedBlocksCount = 0

  private canceled = false

  constructor(onBlockStatusChanged: BlockStatusCallback) {
    this.onBlockStatusChanged = onBlockStatusChanged
  }

  /**
   * Process a chain of blocks.
   * The process is done recursively, starting from the last block in the chain.
   * @param blocks - Map of blocks
   */
  public async initiateProcessing(
    blocks: Map<string, ProcessableBlock>,
    selectedBlocklyBlockId: string | undefined | null,
  ) {
    const chainWithInputNode = this.findChainWithInputNode(blocks, selectedBlocklyBlockId)

    // Restore state of the blocks in the current chain
    // TODO: should handle differently if we want to re-run only if params are changed.
    chainWithInputNode.forEach((block) => {
      block.output = undefined
      block.processStatus = BlockProcessStatus.IDLE
    })

    await this.processChain(this.findLastBlockInTheChain(chainWithInputNode), chainWithInputNode)
  }

  public cancelProcessing() {
    this.canceled = true
  }

  /**
   * Process a block and its input blocks recursively
   * The input blocks are processed first and their outputs are used as inputs for the block
   * @param block - The block to process
   * @param allBlocks - Map of all blocks
   */
  private async processChain(
    block: ProcessableBlock,
    allBlocks: Map<string, ProcessableBlock>,
  ): Promise<BlockResponse | undefined> {
    // if (block.output) {
    //   return block.output
    // }

    const immediatePredecessors = this.findImmediatePredecessors(block, allBlocks)

    let inputs: BlockProcessInputs = {}
    /**
     * If the block has no input blocks, this is the first block in the chain
     * so we use the block's inputs.
     * The inputs of the first block should always be set before processing a chain.
     */
    if (immediatePredecessors.length === 0) {
      // TODO: uncomment once we have a way to set the inputs of the first block
      // first block would never have inputs as it is the inout block, look todo bellow
      //   if (!block.inputs) {
      //     throw new Error('Input for first block not found')
      //   }

      inputs = block.inputs!
    }

    /**
     * If not first block in the chain, process the input blocks first
     * The input blocks are processed in parallel
     */
    const promises = []
    for (const { type, block, inputAlias } of immediatePredecessors) {
      // The then function is used to associate the type with the corresponding input for each processBlock call.
      // This is necessary because Promise.all does not preserve the order of the results, so you can't simply
      // associate the inputs with their types based on their position in the array.
      const promise = this.processChain(block, allBlocks).then((value) => ({
        type,
        value,
        block,
        inputAlias,
      }))
      promises.push(promise)
    }

    const results = await Promise.all(promises)

    if (this.canceled) {
      return
    }

    for (const result of results) {
      if (result.value) {
        inputs = { ...inputs, [result.inputAlias || result.type]: result.value }
      }
    }

    block.inputs = inputs
    block.processStatus = BlockProcessStatus.STARTED
    this.onBlockStatusChanged?.(
      block,
      Array.from(allBlocks.values()).filter((block) => block.blockData.blockType === 'llm').length,
      this.processedBlocksCount,
    )

    try {
      if (block.blockData.blockType === 'input') {
        const inputResponse = block.inputs?.[block.blockData.outputModality] as
          | InputBlockResponse
          | undefined

        if (!inputResponse) {
          throw new Error(`Input not found for ${block.blockData.name} block.`)
        }

        return this.getInputBlockOutput(block, inputResponse)
      }

      const output = await this.processBlock(block)

      block.processStatus = BlockProcessStatus.FINISHED
      block.output = output

      return output
    } catch (error) {
      block.processStatus = BlockProcessStatus.FAILED
      throw error
    } finally {
      if (block.blockData.blockType === 'llm') {
        this.processedBlocksCount++
      }
      this.onBlockStatusChanged?.(block, allBlocks.size, this.processedBlocksCount)
    }
  }

  /**
   * Generates the params for the block and calls the corresponding endpoint.
   * @params block - The block to process
   */
  @cached({
    clearPaths: {
      0: ['blocklyBlock.id'],
    },
    comparePaths: {
      0: ['inputs', 'blockData.blockParameters.model'],
    },
  })
  async processBlock(block: ProcessableBlock) {
    const params = generateBlockParams(block)

    const transformedParams = await transformNested(params, transformParam)

    if (!transformedParams) {
      throw new Error('transformedParams is required')
    }

    if (!block.blockData.endpointName || !blockRequestProcessors[block.blockData.endpointName]) {
      throw new Error('Incorrect block process endpoint')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return blockRequestProcessors[block.blockData.endpointName](transformedParams as any)
  }

  /**
   * Find the immediate predecessors (input blocks) of a block
   * @param block - The block to find the immediate predecessors of
   * @param blocks - Map of blocks
   */
  private findImmediatePredecessors(
    block: ProcessableBlock,
    blocks: Map<string, ProcessableBlock>,
  ): Array<ImmediatePredecessors> {
    const inputs = block.blocklyBlock.inputList

    if (!inputs) {
      return new Array<ImmediatePredecessors>()
    }

    const immediatePredecessors: Array<ImmediatePredecessors> = []

    inputs.forEach((input) => {
      const blockId = input.connection?.targetBlock()?.id
      const type = input.name

      if (blockId && blocks.get(blockId)) {
        immediatePredecessors.push({
          type,
          block: blocks.get(blockId) as ProcessableBlock,
          inputAlias: this.getInputAlias(blocks.get(blockId)),
        })
      }
    })

    return immediatePredecessors
  }

  /**
   * Returns the chain of blocks that include an input node.
   * At the time being only one input block is allowed in the workspace
   * @param blocks
   * @returns
   */
  private findChainWithInputNode(
    blocks: Map<string, ProcessableBlock>,
    selectedBlocklyBlockId: string | undefined | null,
  ) {
    const allBlocks = Array.from(blocks.values())
    const inputBlocks = allBlocks.filter((block) => block.blockData.blockType === 'input')

    if (inputBlocks.length === 0) {
      throw new Error('No input blocks were found')
    } else if (inputBlocks.length > 2 && !selectedBlocklyBlockId) {
      throw new Error('More than one chain detected: please select the chain you want to run')
    } else if (inputBlocks.length === 2) {
      // find the roots and see if they're the same
      const root1 = inputBlocks[0].blocklyBlock.getRootBlock()
      const root2 = inputBlocks[1].blocklyBlock.getRootBlock()

      if (root1.id !== root2.id && !selectedBlocklyBlockId) {
        // more than one list exist and none is selected
        throw new Error('More than one chain detected: please select the chain you want to run')
      }
    }

    const identifierBlock = !selectedBlocklyBlockId
      ? inputBlocks[0]
      : allBlocks.find((block) => block.blocklyBlock.id === selectedBlocklyBlockId)

    if (!identifierBlock) {
      throw new Error('Something went wrong!')
    }

    // find all blocks attached to the identifier block
    const rootBlock = identifierBlock.blocklyBlock.getRootBlock()
    const descendants = rootBlock?.getDescendants(false) // this includes the root

    const chainWithInput = new Map<string, ProcessableBlock>()
    descendants.map((descendant) => {
      const block = blocks.get(descendant.id)
      if (block) {
        chainWithInput.set(descendant.id, block)
      }
    })

    if (!chainWithInput) {
      throw new Error('Chain with input not found')
    }

    return chainWithInput
  }

  /**
   * Find the last block in the chain (the block that isn't input to any other block)
   * @param blocks Map of blocks
   * @returns The last block in the chain
   */
  private findLastBlockInTheChain(blocks: Map<string, ProcessableBlock>) {
    const lastBlock = Array.from(blocks.values()).find(
      (block) => !block.blocklyBlock.outputConnection?.targetBlock(),
    )
    if (!lastBlock) {
      throw new Error('Last block not found')
    }

    return lastBlock
  }

  /**
   * Uploads the input data to the server and returns the url
   * @param block - The block to process
   * @param inputData - The input data of the block
   */
  private getInputBlockOutput = async (block: ProcessableBlock, inputData: SelectedFile) => {
    const modality = block.blockData.outputModality
    if (modality === Modality.Image) {
      const uploadResponse = await uploadFile(inputData, modality)
      return {
        // eslint-disable-next-line camelcase
        image_output: uploadResponse.file_url,
      } as ImageResponse
    } else if (modality === Modality.Audio) {
      const uploadResponse = await uploadFile(inputData, modality)
      return {
        // eslint-disable-next-line camelcase
        audio_output: uploadResponse.file_url,
      } as AudioResponse
    } else if (modality === Modality.Video) {
      const uploadResponse = await uploadFile(inputData, modality)
      return {
        // eslint-disable-next-line camelcase
        video_output: uploadResponse.file_url,
      } as VideoResponse
    } else if (modality === Modality.ThreeDimentional) {
      const uploadResponse = await uploadFile(inputData, modality)
      return {
        // eslint-disable-next-line camelcase
        '3d_response': uploadResponse.file_url,
      } as A3dResponse
    }

    return {
      // eslint-disable-next-line camelcase
      text_output: inputData.content,
    } as TextResponse
  }

  private getInputAlias = (block?: ProcessableBlock) => {
    if (!block) {
      return null
    }

    const check = block.blocklyBlock.outputConnection?.targetConnection?.getCheck()

    if (!check?.length) {
      return null
    }

    if (check.length > 1) {
      return check[1]
    }

    return check[0]
  }
}
