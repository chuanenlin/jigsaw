import * as Blockly from 'blockly'
import { CustomRenderer } from './CustomRenderer'
import { ChildBasedDragger } from './ChildBasedDragger'
import { CustomCategory } from './CustomCategory'
import { blocklyCustomTheme } from './customTheme'

export * from './ChildBasedDragger'
export * from './CustomRenderer'

export const registerCustomClasses = () => {
  Blockly.blockRendering.register('custom_renderer', CustomRenderer)
  Blockly.registry.register(
    Blockly.registry.Type.BLOCK_DRAGGER,
    'ChildBasedDragger',
    ChildBasedDragger,
    true,
  )

  Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    CustomCategory,
    true,
  )

  Blockly.Theme.defineTheme('custom_theme', blocklyCustomTheme)

  return () => {
    Blockly.blockRendering.unregister('custom_renderer')
    Blockly.registry.unregister(Blockly.registry.Type.BLOCK_DRAGGER, 'ChildBasedDragger')
    Blockly.registry.unregister(Blockly.registry.Type.THEME, 'custom_theme')
  }
}
