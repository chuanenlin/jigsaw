import { enqueueSnackbar } from 'notistack'
import { modalityEmojis } from '../../constants'
import { BlockProcessOutput, ProcessableBlock } from '../../context/WorkspaceContext'
import { Modality } from '../../types'

export const getOutputFromResponse = (response: BlockProcessOutput) => {
  if ('text_output' in response) {
    return response.text_output
  } else if ('image_output' in response) {
    return response.image_output
  } else if ('audio_output' in response) {
    return response.audio_output
  } else if ('video_output' in response) {
    return response.video_output
  } else if ('3d_response' in response) {
    return response['3d_response']
  } else if ('content' in response) {
    return response.content
  }
}

export const isInputBlock = (processableBlock?: ProcessableBlock) => {
  return processableBlock?.blockData.blockType === 'input'
}

export const getInputCount = (processableBlock?: ProcessableBlock) => {
  return processableBlock?.blockData.inputModality.length || 0
}

export const getInputModality = (
  index: number,
  processableBlock?: ProcessableBlock,
): Modality | undefined => {
  return processableBlock?.blockData.inputModality[index].modality
}

export const getModalityEmojiOrEmpty = (modality?: Modality) => {
  if (!modality) return ''
  return modalityEmojis[modality]
}

export const hasOutput = (block?: ProcessableBlock) => {
  if (!block) {
    return false
  }

  return block.output !== undefined
}

export const hasInput = (block?: ProcessableBlock) =>
  !!block?.inputs || block?.blockData.outputModality === Modality.Text

export const isTextOutput = (block?: ProcessableBlock) => {
  if (!block) {
    return false
  }

  return block.blockData.outputModality === Modality.Text
}

export const isTextInput = (block?: ProcessableBlock) => {
  if (!block) {
    return false
  }

  return block.blockData.inputModality.find(({ modality }) => modality === Modality.Text)
}

export const copyToClipBoard = async (content: string) =>
  await navigator.clipboard.writeText(content)

export const saveFile = async (url: string) => {
  try {
    const response = await fetch(url)
    const data = await response.blob()
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(data)
    const fileName = url.split('/').pop()
    link.download = fileName || 'output'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    enqueueSnackbar('An error occured while saving the file', { variant: 'error' })
    console.error('Error downloading file:', error)
  }
}
