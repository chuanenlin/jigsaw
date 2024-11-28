import Blockly from 'blockly/core'
import * as En from 'blockly/msg/en'

/**
 * Override the default Blockly behaviour.
 * Add any custom overrides here.
 */
export const overrideBlockly = () => {
  /**
   * Override the zoom scale to disable zooming toolbox when workspace is zoomed
   * @override
   */
  Blockly.VerticalFlyout.prototype.getFlyoutScale = function () {
    return 1
  }

  /**
   * Set the locale to avoid messages not being loaded
   * https://groups.google.com/g/blockly/c/jbZZabrAsMk/m/d94HXtWQAAAJ
   */
  Blockly.setLocale(En)
}
