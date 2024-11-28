import Blockly, { ICollapsibleToolboxItem, IToolbox } from 'blockly/core'
import { CategoryInfo } from 'blockly/core/utils/toolbox'
import { Modality } from '../../../types'

export class CustomCategory extends Blockly.ToolboxCategory {
  constructor(categoryDef: CategoryInfo, toolbox: IToolbox, optParent: ICollapsibleToolboxItem) {
    super(categoryDef, toolbox, optParent)
  }

  /**
   * Adds the colour to the toolbox.
   * This is called on category creation and whenever the theme changes.
   * @override
   */
  addColourBorder_(colour: string) {
    if (!this.rowDiv_) {
      return
    }

    this.rowDiv_.style.backgroundColor = colour
    this.rowDiv_.style.marginBottom = '0'
  }

  /**
   * Sets the style for the category when it is selected or deselected.
   * @param {boolean} isSelected True if the category has been selected,
   *     false otherwise.
   * @override
   */
  setSelected(isSelected: boolean) {
    if (!this.rowDiv_) {
      return
    }
    // We do not store the label span on the category, so use getElementsByClassName.
    const labelDom = this.rowDiv_?.getElementsByClassName('blocklyTreeLabel')[0] as HTMLElement

    if (!labelDom) {
      return
    }
    this.toggleSelectedClasses(isSelected)
  }

  toggleSelectedClasses(selected: boolean) {
    if (!this.rowDiv_) {
      return
    }

    const container = this.rowDiv_.querySelector('.blocklyTreeRowContentContainer')

    if (container) {
      const icon = container.querySelector('div > .category-icon') as HTMLSpanElement | null
      const label = container.querySelector('.blocklyTreeLabel') as HTMLSpanElement | null

      if (icon && label) {
        if (selected) {
          icon.classList.add('selected-category-icon')
          label.classList.add('selected-category-label')
        } else {
          icon.classList.remove('selected-category-icon')
          label.classList.remove('selected-category-label')
        }
      }
    }
  }

  /**
   * Creates the dom used for the icon.
   * @returns {HTMLElement} The element for the icon.
   * @override
   */
  createIconDom_() {
    const iconContainer = document.createElement('div')
    const icon = document.createElement('span')
    icon.classList.add('category-icon')

    switch (this.name_) {
      case Modality.Text:
        icon.innerHTML = '🔤'
        break
      case Modality.Image:
        icon.innerHTML = '🖼️'
        break
      case Modality.Video:
        icon.innerHTML = '🎥'
        break
      case Modality.Audio:
        icon.innerHTML = '🔊'
        break
      case Modality.ThreeDimentional:
        icon.innerHTML = '🎨'
        break
      case Modality.Sketch:
        icon.innerHTML = '🖌️'
        break
      case Modality.Custom:
        icon.innerHTML = '🔧'
    }

    Object.assign(iconContainer.style, {
      display: 'flex',
      justifyContent: 'center',
    })

    iconContainer.appendChild(icon)

    return iconContainer
  }
}
