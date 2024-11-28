import * as Blockly from 'blockly/core'
import { CustomConstantProvider } from './CustomConstantProvider'

Blockly.Flyout.prototype.isScrollable = function () {
  return false
}

export class CustomRenderer extends Blockly.thrasos.Renderer {
  constructor() {
    super('custom_renderer')
  }

  /**
   * @override
   */
  makeConstants_() {
    return new CustomConstantProvider()
  }

  protected makeDrawer_(
    // I guess we can use this to adjust how we draw the
    // block by writing a new Drawer class and register it
    // here instead of Blockly.blockRendering.Drawer
    block: Blockly.BlockSvg,
    info: Blockly.blockRendering.RenderInfo,
  ): Blockly.blockRendering.Drawer {
    return new Blockly.blockRendering.Drawer(block, info)
  }
}
