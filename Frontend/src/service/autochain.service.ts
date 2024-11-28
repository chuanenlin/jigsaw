import { TAB_HEIGHT } from '../components/blockly/custom/CustomConstantProvider'
import { BlockParameters } from '../types'
import Blockly, { Connection } from 'blockly/core'
import { blocksList, EndpointToBlockType } from '../constants'
import { parseBlockData } from '../context/util'

export interface AutoChainBlock {
  id: string
  type: string
  inputs?: { [key: string]: string }
}

export type AutoChainData = {
  chain: Array<AutoChainBlock>
  parameters: { [key: string]: Pick<BlockParameters, 'model'> }
}

const ANIMATION_DURATION = 500

export class AutoChainService {
  private workspace: Blockly.WorkspaceSvg
  private chainData: AutoChainData
  private blocksById: { [key: string]: Blockly.BlockSvg } = {}

  constructor(workspace: Blockly.WorkspaceSvg, autoChainResponse: AutoChainData) {
    this.workspace = workspace
    this.chainData = autoChainResponse
  }

  /**
   * Get the left most blocks (root blocks) in the chain. The left most blocks are the blocks that have no inputs.
   * @returns Descending ordered array of the root blocks based on the length of their longest path
   */
  getRootBlocks() {
    const findBlockPathLength = (blockData: AutoChainBlock): AutoChainBlock[] => {
      if (!blockData.inputs) {
        return [blockData]
      }

      const inputBlockData = this.chainData.chain.find(
        (block) => block.id === Object.values(blockData.inputs!)[0],
      )!

      return [blockData, ...findBlockPathLength(inputBlockData)]
    }

    const rootBlocks: AutoChainBlock[] = []

    for (const blockData of this.chainData.chain) {
      if (!blockData.inputs) {
        rootBlocks.push(blockData)
      }
    }

    rootBlocks.sort((a, b) => findBlockPathLength(b).length - findBlockPathLength(a).length)

    return rootBlocks
  }

  prepareWorkspace() {
    // change scale to 0.5 to fit more blocks in the workspace
    this.workspace.setScale(0.5)
  }

  /**
   * Gets the block definition for the given block data.
   * Input blocks are special case. They have different names in the block list and in the autochain response
   * @param blockData
   */
  getBlockDefinition(blockData: AutoChainBlock) {
    let blockDefinition
    if (blockData.type.includes('input')) {
      switch (blockData.type) {
        case 'text_input':
          blockDefinition = blocksList.find((block) => block.name === 'Write input')
          break
        case 'image_input':
          blockDefinition = blocksList.find((block) => block.name === 'Upload image')
          break
        case 'video_input':
          blockDefinition = blocksList.find((block) => block.name === 'Upload video')
          break
        case 'audio_input':
          blockDefinition = blocksList.find((block) => block.name === 'Upload audio')
          break
        case '3d_input':
          blockDefinition = blocksList.find((block) => block.name === 'Upload 3D model')
          break
        case 'sketch_input':
          blockDefinition = blocksList.find((block) => block.name === 'Draw doodle')
          break
        case 'custom_input':
          blockDefinition = blocksList.find((block) => block.name === 'Custom')
          break
      }
    } else {
      blockDefinition = blocksList.find((block) => block.endpointName === blockData.type)
    }

    return blockDefinition
  }

  /**
   * Create a block in the workspace
   * @param blockData - The block data
   * @param isRoot - Whether the block is a root block (left most block with longest path in the chain)
   */
  addBlock(blockData: AutoChainBlock, isRoot = false) {
    if (this.blocksById[blockData.id]) {
      return
    }

    // The autochain response uses the endpoint name as the block type
    const blockDefinition = this.getBlockDefinition(blockData)

    if (!blockDefinition) {
      throw new Error(`Block definition for ${blockData.type} not found`)
    }

    const block = this.workspace.newBlock(blockDefinition.name)
    const model = this.chainData.parameters[blockData.id] ?? {}
    /**
     * Keep track of the parameters of each block so that we can use them when processing the chain
     */
    block.data = JSON.stringify({
      ...parseBlockData(block.data || ''),
      model: model,
    })

    // All blocks other than root should be positiond somewhere far away from current blocks
    // otherwise it might be positioned on top of another block, which would cause the existing
    // block to be moved
    if (!isRoot) {
      block.moveBy(1000000, 0)
    }

    block.initSvg()
    block.render()

    // To start the chain from the middle of the workspace
    if (isRoot) {
      const metrics = this.workspace.getMetrics()
      const toolboxHeight = this.workspace.getToolbox()?.getHeight() ?? 0

      block.translate(
        block.getRelativeToSurfaceXY().x,
        metrics.viewTop + toolboxHeight - block.height / 2,
      )

      // assuming all blocks are of the same size
      const blockSize = block.getHeightWidth()
      const blockPosition = block.getRelativeToSurfaceXY()
      const chainSize = {
        width: blockSize.width * this.chainData.chain.length,
        height: blockSize.height,
      }

      // move the camera to show the chain at the center
      this.workspace.scroll(blockPosition.x + chainSize.width / 2, blockPosition.y - toolboxHeight)
    }

    this.workspace.fireChangeListener(new Blockly.Events.BlockCreate())
    this.blocksById[blockData.id] = block
  }

  /**
   * Find the blocks that are to be connected to the given block
   * @param blockData - The block data
   * @returns - The blocks that reference the given block
   */
  findReferencingBlocks = (blockData: AutoChainBlock) => {
    const referencingBlocks: AutoChainBlock[] = []

    for (const otherBlockData of this.chainData.chain) {
      if (otherBlockData.inputs && Object.values(otherBlockData.inputs).includes(blockData.id)) {
        referencingBlocks.push(otherBlockData)
      }
    }

    return referencingBlocks
  }

  /**
   * Translate the block to the position of the connection it is being connected to
   * @param parentBlock - The block that is being connected to
   * @param nextBlock - The block that is being connected
   * @param nextBlockInputConnection - The connection of the block that is being connected
   */
  translateBlock(
    parentBlock: Blockly.BlockSvg,
    nextBlock: Blockly.BlockSvg,
    nextBlockInputConnection: Connection,
  ) {
    let spaceFromBlockTopToConnection = 0

    // If a block has more than one input, we should find the position of the comparison input
    // The block, when added to the workspace, is positioned at the top left corner of the block
    // So move the block down by the height of the block to get the position of the comparison input
    if (nextBlock.inputList.length > 1) {
      let topConnection = nextBlock.inputList[0].connection
      nextBlock.inputList.forEach((input) => {
        if ((input.connection?.y ?? 0) < (topConnection?.y ?? 0)) {
          topConnection = input.connection
        }
      })

      if (topConnection?.y !== nextBlockInputConnection.y) {
        // 3.15 is found by trial and error
        spaceFromBlockTopToConnection = TAB_HEIGHT * 3.2
      }
    }

    const { x, y } = parentBlock.getRelativeToSurfaceXY()
    nextBlock.translate(
      x + nextBlock.getHeightWidth().width - TAB_HEIGHT,
      y - spaceFromBlockTopToConnection,
    )
  }

  /**
   * Highlight parent and next block for animation
   * @param block - The block to be highlighted
   * @param alreadyHighlighted
   */
  highlightBlock(block: Blockly.BlockSvg, alreadyHighlighted: Set<string>) {
    // The root block should not be highlighted
    if (!alreadyHighlighted.has(block.id)) {
      block.addSelect()
      alreadyHighlighted.add(block.id)
    }
  }

  removeHighlight = (blocks: Blockly.BlockSvg[]) => {
    blocks.forEach((block) => block.removeSelect())
  }

  /**
   * Chain the given block to its referencing blocks
   * @param blockData - The block data
   * @param alreadyHighlighted - The blocks that have already been highlighted
   * @param isRoot - Whether the block is a root block (left most block with longest path in the chain)
   */
  async chainBlock(
    blockData: AutoChainBlock,
    alreadyHighlighted: Set<string> = new Set<string>(),
    isRoot = false,
  ) {
    this.addBlock(blockData, isRoot)

    const referencingBlocks = this.findReferencingBlocks(blockData)
    const parentBlock = this.blocksById[blockData.id]

    // Required to animate first connection of the root block
    if (isRoot) {
      await new Promise((resolve) => setTimeout(resolve, ANIMATION_DURATION))
    }

    for (const refBlock of referencingBlocks) {
      const alreadyAdded = !!this.blocksById[refBlock.id]
      this.addBlock(refBlock)

      // Next block to be connected to the parent block
      const nextBlock = this.blocksById[refBlock.id]

      const parentOutputConnection = parentBlock.outputConnection
      const inputKey = Object.keys(refBlock.inputs!).find(
        (key) => refBlock.inputs![key] === blockData.id,
      )
      const nextBlockInputConnection = nextBlock.getInput(inputKey!)?.connection

      if (nextBlockInputConnection && parentOutputConnection) {
        // Due to the recursive nature of the function, the next block may have already been connected
        // To avoid moving the block twice, we check if the block has already been added
        if (!alreadyAdded) {
          this.translateBlock(parentBlock, nextBlock, nextBlockInputConnection)
        }

        // The root block should not be highlighted
        if (!isRoot) {
          this.highlightBlock(parentBlock, alreadyHighlighted)
        }

        this.highlightBlock(nextBlock, alreadyHighlighted)

        nextBlockInputConnection.connect(parentOutputConnection)
        // For animation
        await new Promise((resolve) => setTimeout(resolve, ANIMATION_DURATION))

        this.removeHighlight([parentBlock, nextBlock])
      }
    }

    // Chain the referencing blocks
    for (const refBlock of referencingBlocks) {
      await this.chainBlock(refBlock, alreadyHighlighted)
    }
  }

  /**
   * Automatically chain the blocks in the workspace
   */
  async autoChain() {
    const rootBlocks = this.getRootBlocks()

    // A valid chain must have at least one root block
    if (!rootBlocks.length) {
      throw Error('No root blocks found')
    }

    // Keep track of the blocks that have been highlighted
    // so that they are not highlighted again when they are connected
    const alreadyHighlightedBlocks = new Set<string>()

    this.prepareWorkspace()

    for (const [i, leftMostBlock] of rootBlocks.entries()) {
      // The first block is the root block (since rootBlocks are sorted by their path length)
      const isRoot = i === 0
      await this.chainBlock(leftMostBlock, alreadyHighlightedBlocks, isRoot)
    }
  }
}
