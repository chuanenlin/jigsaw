import * as Blockly from 'blockly'

export class ChildBasedDragger extends Blockly.BlockDragger {
  private originalDraggingBlock: Blockly.BlockSvg
  private childDraggedConnectionManager_: Blockly.InsertionMarkerManager

  /* same as parent's dragTarget but can't use the one from parent because it's private */
  private myDragTarget_: Blockly.IDragTarget | null = null

  constructor(block: Blockly.BlockSvg, workspace: Blockly.WorkspaceSvg) {
    super(block, workspace)
    this.originalDraggingBlock = block
    this.draggingBlock_ = this.getRoot(block)

    /** Object that keeps track of connections on dragged blocks. */
    this.draggedConnectionManager_ = new Blockly.InsertionMarkerManager(
      this.getRoot(this.draggingBlock_),
    )

    this.childDraggedConnectionManager_ = new Blockly.InsertionMarkerManager(
      this.originalDraggingBlock,
    )

    /**
     * The location of the top left corner of the dragging block at the
     * beginning of the drag in workspace coordinates.
     */
    this.startXY_ = this.getRoot(this.draggingBlock_).getRelativeToSurfaceXY()
  }

  public dispose(): void {
    super.dispose()

    if (this.childDraggedConnectionManager_) {
      this.childDraggedConnectionManager_.dispose()
    }
  }

  protected override shouldDisconnect_(healStack: boolean): boolean {
    return !!(
      this.originalDraggingBlock.getChildren(true).length > 0 ||
      (healStack &&
        this.originalDraggingBlock.previousConnection &&
        this.originalDraggingBlock.previousConnection.targetBlock())
    )
  }

  /**
   * Disconnects the block and moves it to a new location.
   *
   * @param healStack Whether or not to heal the stack after disconnecting.
   * @param currentDragDeltaXY How far the pointer has moved from the position
   *     at mouse down, in pixel units.
   */
  protected override disconnectBlock_(
    healStack: boolean,
    currentDragDeltaXY: Blockly.utils.Coordinate,
  ) {
    const childBlocks = this.originalDraggingBlock.getChildren(true)
    childBlocks.forEach((childBlock) => childBlock.unplug(healStack))

    const delta = this.pixelsToWorkspaceUnits_(currentDragDeltaXY)
    const newLoc = Blockly.utils.Coordinate.sum(this.startXY_, delta)

    this.draggingBlock_.translate(newLoc.x, newLoc.y)
    Blockly.blockAnimations.disconnectUiEffect(this.draggingBlock_)
    this.draggedConnectionManager_.updateAvailableConnections()

    this.childDraggedConnectionManager_.updateAvailableConnections()
  }

  drag(e: PointerEvent, currentDragDeltaXY: Blockly.utils.Coordinate): void {
    super.drag(e, currentDragDeltaXY)

    const delta = this.pixelsToWorkspaceUnits_(currentDragDeltaXY)

    const oldDragTarget = this.myDragTarget_
    this.myDragTarget_ = this.workspace_.getDragTarget(e)

    this.childDraggedConnectionManager_.update(delta, this.myDragTarget_)
    const oldWouldDeleteBlock2 = this.workspace_.trashcan?.wouldDelete(this.draggingBlock_, false)
    this.wouldDeleteBlock_ = this.childDraggedConnectionManager_.wouldDeleteBlock
    if (oldWouldDeleteBlock2 !== this.wouldDeleteBlock_) {
      // Prevent unnecessary add/remove class calls.
      this.updateCursorDuringBlockDrag_()
    }

    // Call drag enter/exit/over after wouldDeleteBlock is called in
    // InsertionMarkerManager.update.
    if (this.myDragTarget_ !== oldDragTarget) {
      oldDragTarget && oldDragTarget.onDragExit(this.originalDraggingBlock)
      this.myDragTarget_ && this.myDragTarget_.onDragEnter(this.originalDraggingBlock)
    }
    this.myDragTarget_ && this.myDragTarget_.onDragOver(this.originalDraggingBlock)
  }

  endDrag(e: PointerEvent, currentDragDeltaXY: Blockly.utils.Coordinate): void {
    super.endDrag(e, currentDragDeltaXY)

    if (this.myDragTarget_) {
      this.myDragTarget_.onDrop(this.originalDraggingBlock)

      if (this.workspace_.trashcan?.wouldDelete(this.draggingBlock_, false)) {
        this.draggingBlock_.dispose(true, true)
      }
    }
  }

  protected updateBlockAfterMove_(): void {
    this.fireMoveEvent_()
    const oldRoot = this.draggingBlock_
    const oldRootLoc = oldRoot.getRelativeToSurfaceXY()
    const dragging = this.originalDraggingBlock
    const draggingLoc = dragging.getRelativeToSurfaceXY()
    let intersectionMarker
    let intersectionMarkerLoc

    if (this.draggedConnectionManager_.wouldConnectBlock()) {
      intersectionMarker = this.draggedConnectionManager_.getInsertionMarkers()[0]
      intersectionMarkerLoc = intersectionMarker.getRelativeToSurfaceXY()

      // Applying connections also rerenders the relevant blocks.
      this.draggedConnectionManager_.applyConnections()
    } else if (this.childDraggedConnectionManager_.wouldConnectBlock()) {
      intersectionMarker = this.childDraggedConnectionManager_.getInsertionMarkers()[0]
      intersectionMarkerLoc = intersectionMarker.getRelativeToSurfaceXY()
      this.childDraggedConnectionManager_.applyConnections()
    } else {
      this.draggingBlock_.queueRender()
    }
    this.draggingBlock_.scheduleSnapAndBump()

    if (intersectionMarkerLoc) {
      const root = this.getRoot(this.draggingBlock_)
      const isSuperior = oldRoot.id === root.id

      if (isSuperior) {
        const delta = Blockly.utils.Coordinate.difference(intersectionMarkerLoc, draggingLoc)

        root.moveBy(delta.x, delta.y)
      } else {
        const delta = Blockly.utils.Coordinate.difference(oldRootLoc, intersectionMarkerLoc)

        root.moveBy(delta.x, delta.y)
      }
    }
  }

  getInsertionMarkers(): Blockly.BlockSvg[] {
    const res = super.getInsertionMarkers()

    if (
      this.childDraggedConnectionManager_ &&
      this.childDraggedConnectionManager_.getInsertionMarkers
    ) {
      return this.childDraggedConnectionManager_.getInsertionMarkers()
    }

    return res
  }

  private getRoot(block: Blockly.BlockSvg): Blockly.BlockSvg {
    let parent = block.getParent()

    while (parent) {
      block = parent
      parent = block.getParent()
    }

    return block
  }
}
