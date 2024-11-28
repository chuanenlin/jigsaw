import { javascriptGenerator } from 'blockly/javascript'
import Blockly from 'blockly/core'

javascriptGenerator['test_react_field'] = function (block: Blockly.Block) {
  return 'console.log(\'custom block\');\n'
}

javascriptGenerator['test_react_date_field'] = function (block: Blockly.Block) {
  return 'console.log(' + block.getField('DATE')?.getText() + ');\n'
}
