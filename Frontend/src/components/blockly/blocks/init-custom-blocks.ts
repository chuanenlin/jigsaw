import Blockly from 'blockly/core'
import { blocksList } from '../../../constants'

export const initCustomBlocks = () => {
  blocksList.map((block) => {
    Blockly.Blocks[block.name] = {
      init: function () {
        this.contextMenu = false
        /**
         * If the block has two inputs and one output, the message0 will be
         * "Image to Text Block 1 %1, %2". But there's no label for the second input
         * so there will be a comma at the end of the message0. This removes the comma.
         */
        const message0 = `${block.name} ${
          block.blockType === 'input' ? '' : block.inputModality.map((_, index) => `%${index + 1}`)
        }`
        const lastCommaIndex = message0.lastIndexOf(',')
        const message0WithoutLastComma =
          message0.substring(0, lastCommaIndex) + message0.substring(lastCommaIndex + 1)

        this.jsonInit({
          message0: message0WithoutLastComma,
          args0:
            block.blockType === 'input'
              ? undefined
              : block.inputModality.map((inputModality) => {
                  return {
                    type: 'input_value',
                    name: inputModality.modality,
                    check: inputModality.alias
                      ? [inputModality.modality, inputModality.alias]
                      : inputModality.modality,
                  }
                }),
          colour: 160,
          tooltip: '',
          helpUrl: '',
        })

        this.setOutput(true, block.outputModality)

        this.data = JSON.stringify({ block })

        this.style = {
          colourPrimary: '#f2f2f2',
          colourSecondary: '#e6e6e6',
          colourTertiary: '#d9d9d9',
        }

        this.pathObject.svgRoot.classList.add(block.id)

        // Center text in multi input blocks
        if (block.inputModality.length > 1) {
          this.onchange = () => this.getSvgRoot().lastChild?.firstChild?.setAttribute('y', '55')
        }

        // Center text in the input blocks
        if (block.blockType === 'input') {
          this.onchange = () => this.getSvgRoot().lastChild?.firstChild?.setAttribute('y', '15')
        }
        this.RTL = true
      },
    }
  })
}
