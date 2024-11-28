import { Typography } from '@mui/material'
import { BlockProcessStatus, useWorkspaceContext } from '../../context/WorkspaceContext'
import {
  copyToClipBoard,
  getModalityEmojiOrEmpty,
  getOutputFromResponse,
  hasOutput,
  isInputBlock,
  isTextOutput,
  saveFile,
} from './input-output.util'
import { MediaViewer } from './MediaViewer'
import { PanelHeader } from './PanelHeader'
import { CopyAll, Save } from '@mui/icons-material'
import { LoadingIndicator } from '../atoms/LoadingIndicator'

export const OutputPanel = () => {
  const { selectedProcessableBlock } = useWorkspaceContext()

  const extractBlockOutput = () => {
    if (!selectedProcessableBlock) {
      // TODO: show output of the last block in the chain
      return null
    }

    if (isInputBlock(selectedProcessableBlock)) {
      return <Typography variant='h5'></Typography>
    }

    const getBlockOutput = () => {
      if (!hasOutput(selectedProcessableBlock)) {
        return <Typography variant='h5'>Processed with no output!!!!</Typography>
      }

      const output = selectedProcessableBlock.output!
      const content = getOutputFromResponse(output)
      const modality = selectedProcessableBlock.blockData.outputModality

      return (
        <MediaViewer
          content={content}
          modality={modality}
          key={selectedProcessableBlock?.blocklyBlock.id}
        />
      )
    }

    switch (selectedProcessableBlock?.processStatus) {
      case BlockProcessStatus.STARTED:
        return (
          <LoadingIndicator 
            modality={selectedProcessableBlock.blockData.outputModality}
            message={`Processing ${selectedProcessableBlock.blockData.blockType}...`}
            tips={[
              'AI models are working their magic...',
              'This might take a minute...',
              'Creating something amazing...',
              'Almost there...',
              `Generating ${selectedProcessableBlock.blockData.outputModality}...`,
              'Processing your request...',
            ]}
          />
        )
      case BlockProcessStatus.FINISHED:
        return getBlockOutput()
      case BlockProcessStatus.FAILED:
        return (
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="text-4xl">❌</div>
            <Typography variant='h6' color="error">Failed to process block</Typography>
            <Typography variant='body2' color="textSecondary" className="text-center">
              Please check your inputs and try again
            </Typography>
          </div>
        )
      default:
        return <Typography variant='h5'></Typography>
    }
  }

  const onActionButtonClicked = async () => {
    const output = selectedProcessableBlock?.output
    if (!output) {
      return
    }

    const content = getOutputFromResponse(output)

    if (!content) {
      throw new Error('No content to save')
    }

    if (isTextOutput(selectedProcessableBlock)) {
      return copyToClipBoard(content)
    }

    saveFile(content)
  }

  const getActionButton = () => {
    const icon = isTextOutput(selectedProcessableBlock) ? <CopyAll /> : <Save />
    const title = isTextOutput(selectedProcessableBlock) ? 'Copy' : 'Save'

    return {
      icon,
      title,
      label: title,
      onClick: onActionButtonClicked,
    }
  }

  return (
    <div
      className={`
        w-full
        h-full
        bg-white
        rounded-2xl
        border
        border-solid
        border-neutral-400
        flex-grow-0
        flex-shrink-0
        flex
        flex-col
        justify-start
        box-border
        ${
          selectedProcessableBlock === undefined ||
          selectedProcessableBlock?.blockData.blockType === 'input'
            ? 'opacity-30'
            : ''
        }
      `}
    >
      <PanelHeader
        title={`${getModalityEmojiOrEmpty(
          selectedProcessableBlock?.blockData.outputModality,
        )} Output`}
        button={hasOutput(selectedProcessableBlock) && getActionButton()}
      />
      <div className='w-full h-full box-border flex justify-center items-center overflow-hidden'>
        {extractBlockOutput()}
      </div>
    </div>
  )
}
