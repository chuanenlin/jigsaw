import * as Blockly from 'blockly'

const MIN_BLOCK_HEIGHT = 100
const NOTCH_WIDTH = 50
export const TAB_HEIGHT = 30
const TAB_WIDTH = 30

const TAB_OFFSET_FROM_TOP = MIN_BLOCK_HEIGHT / 2 - TAB_HEIGHT / 2
const TOP_ROW_MIN_HEIGHT = MIN_BLOCK_HEIGHT / 2 - TAB_HEIGHT / 2

export class CustomConstantProvider extends Blockly.blockRendering.ConstantProvider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RECT_PREV_NEXT: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RECT_INPUT_OUTPUT: any
  constructor() {
    // Set up all of the constants from the base provider.
    super()

    // Override a few properties.
    /**
     * The height of the block.
     * @type {number}
     * @override
     */
    this.MIN_BLOCK_HEIGHT = MIN_BLOCK_HEIGHT

    /**
     * The width of the notch used for previous and next connections.
     * @type {number}
     * @override
     */
    this.NOTCH_WIDTH = NOTCH_WIDTH

    /**
     *
     * @type {number}
     * @override
     */
    this.TAB_OFFSET_FROM_TOP = TAB_OFFSET_FROM_TOP

    /**
     * The space between bottom of the block and the last input and the top of the block and the first input.
     * @type {number}
     * @override
     */
    this.TOP_ROW_MIN_HEIGHT = TOP_ROW_MIN_HEIGHT

    /**
     * The height of the puzzle tab used for input and output connections.
     * @type {number}
     * @override
     */
    this.TAB_HEIGHT = TAB_HEIGHT

    this.TAB_WIDTH = TAB_WIDTH

    /**
     * The amount of padding between inputs of a multi input block.
     * 2.2 if found by trial and error, there's no logic behind it.
     * it is the best value to make the blocks look good when other blocks are connected to it.
     * @type {number}
     * @override
     */
    this.LARGE_PADDING = TAB_HEIGHT * 2.2

    /**
     * The padding after the last input.
     * @type {number}
     * @override
     */
    this.BOTTOM_ROW_MIN_HEIGHT = TAB_HEIGHT

    /**
     * These values are for how the block resizes when the inputs are attached.
     */
    this.SMALL_PADDING = TAB_HEIGHT
    this.MEDIUM_PADDING = TAB_HEIGHT
    this.MEDIUM_LARGE_PADDING = TAB_HEIGHT
  }

  /**
   * @override
   */
  init() {
    // First, call init() in the base provider to store the default objects.
    super.init()

    // Add calls to create shape objects for the new connection shapes.
    this.RECT_PREV_NEXT = this.makeRectangularPreviousConn()
    this.RECT_INPUT_OUTPUT = this.makeRoundTab()
  }

  /**
   * @override
   */
  shapeFor(connection: Blockly.RenderedConnection) {
    switch (connection.type) {
      case Blockly.INPUT_VALUE:
      case Blockly.OUTPUT_VALUE:
        return this.RECT_INPUT_OUTPUT
      case Blockly.PREVIOUS_STATEMENT:
      case Blockly.NEXT_STATEMENT:
        return this.RECT_PREV_NEXT
      default:
        throw Error('Unknown connection type')
    }
  }

  /**
   * @returns Rectangular notch for use with previous and next connections.
   */
  makeRectangularPreviousConn() {
    const width = this.NOTCH_WIDTH
    const height = 0

    /**
     * Since previous and next connections share the same shape you can define
     * a function to generate the path for both.
     *
     * @param dir Multiplier for the horizontal direction of the path (-1 or 1)
     * @returns SVGPath line for use with previous and next connections.
     */
    function makeMainPath(dir: number) {
      return Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(0, height * 0.5),
        Blockly.utils.svgPaths.point(dir * width, 0),
        Blockly.utils.svgPaths.point(0, -height * 0.5),
      ])
    }
    const pathLeft = makeMainPath(1)
    const pathRight = makeMainPath(-1)

    return {
      width: width,
      height: height,
      pathLeft: pathLeft,
      pathRight: pathRight,
    }
  }

  /**
   * @returns Rectangular puzzle tab for use with input and output connections.
   */
  makeRectangularInputConn() {
    const width = this.TAB_WIDTH
    const height = this.TAB_HEIGHT

    /**
     * Since input and output connections share the same shape you can define
     * a function to generate the path for both.
     *
     * @param dir Multiplier for the vertical direction of the path (-1 or 1)
     * @returns SVGPath line for use with input and output connections.
     */
    function makeMainPath(dir: number) {
      return Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(-width, 0),
        Blockly.utils.svgPaths.point(0, dir * height),
        Blockly.utils.svgPaths.point(width, 0),
      ])
    }
    const pathUp = makeMainPath(-1)
    const pathDown = makeMainPath(1)

    return {
      width: width,
      height: height,
      pathUp: pathUp,
      pathDown: pathDown,
    }
  }

  /**
   * @returns An object containing sizing and path information about puzzle
   *     tabs.
   */
  protected makeRoundTab() {
    const width = this.TAB_WIDTH * 0.8
    const height = this.TAB_HEIGHT

    /**
     * Make the main path for the puzzle tab made out of a few curves (c and s).
     * Those curves are defined with relative positions.  The 'up' and 'down'
     * versions of the paths are the same, but the Y sign flips.  Forward and
     * back are the signs to use to move the cursor in the direction that the
     * path is being drawn.
     *
     * @param up True if the path should be drawn from bottom to top, false
     *     otherwise.
     * @returns A path fragment describing a puzzle tab.
     */
    function makeMainPath(up: boolean): string {
      const forward = up ? -1 : 1
      const back = -forward

      const halfHeight = height / 2
      const overlap = (-1 * halfHeight) / 1.5
      const control1Y = halfHeight + overlap
      const control2Y = halfHeight + overlap
      const control3Y = overlap // 2.5

      const endPoint1 = Blockly.utils.svgPaths.point(-width, forward * halfHeight)
      const endPoint2 = Blockly.utils.svgPaths.point(width, forward * halfHeight)

      return (
        Blockly.utils.svgPaths.curve('c', [
          Blockly.utils.svgPaths.point(0, forward * control1Y),
          Blockly.utils.svgPaths.point(-width, back * control2Y),
          endPoint1,
        ]) +
        Blockly.utils.svgPaths.curve('s', [
          Blockly.utils.svgPaths.point(width, back * control3Y),
          endPoint2,
        ])
      )
    }

    // c 0,-10  -8,8  -8,-7.5  s 8,2.5  8,-7.5
    const pathUp = makeMainPath(true)
    // c 0,10  -8,-8  -8,7.5  s 8,-2.5  8,7.5
    const pathDown = makeMainPath(false)

    return {
      type: this.SHAPES.PUZZLE,
      width,
      height,
      pathDown,
      pathUp,
    }
  }
}
