import { useFilePicker } from 'use-file-picker'
import { ProcessableBlock, useWorkspaceContext } from '../../context/WorkspaceContext'
import { useEffect, useState } from 'react'
import { ModalityToDataReadType, ModalityToInputType } from '../../constants'
import { Modality } from '../../types'
import { MediaViewer } from './MediaViewer'
import {
  copyToClipBoard,
  getInputCount,
  getInputModality,
  getModalityEmojiOrEmpty,
  getOutputFromResponse,
  hasInput,
  isInputBlock,
  isTextInput,
  saveFile,
} from './input-output.util'
import { PanelHeader } from './PanelHeader'
import { CopyAll, Save, UploadOutlined } from '@mui/icons-material'
import { DropZone } from './DropZone'
import { SelectedFile } from '../../api'
import { enqueueSnackbar } from 'notistack'

const MAX_ALLOWED_FILE_SIZE_MB = 200

const getBlockInputContent = (index: number, selectedProcessableBlock?: ProcessableBlock) => {
  const inputs = selectedProcessableBlock?.inputs

  if (!inputs && isInputBlock(selectedProcessableBlock)) {
    return {
      modality: selectedProcessableBlock?.blockData.outputModality,
      content: '',
    }
  }

  if (!inputs || index >= Object.values(inputs).length) {
    return null
  }

  const firstInput = Object.values(inputs)[index]
  const modality = Object.keys(inputs)[index]

  const content = getOutputFromResponse(firstInput)

  return {
    content,
    modality: modality as Modality,
  }
}

const getFilePickerType = (processableBlock?: ProcessableBlock) => {
  if (!processableBlock) {
    return ['']
  }

  return ModalityToInputType[processableBlock.blockData.outputModality]
}

const getFilePickerReadType = (processableBlock?: ProcessableBlock) => {
  if (!processableBlock) {
    return
  }

  return ModalityToDataReadType[processableBlock.blockData.outputModality]
}

export const InputPanel = () => {
  const { selectedProcessableBlock } = useWorkspaceContext()
  const [openFileSelector, { filesContent, clear }] = useFilePicker({
    accept: getFilePickerType(selectedProcessableBlock),
    readAs: getFilePickerReadType(selectedProcessableBlock),
    maxFileSize: 200,
  })
  const [inputPage, setInputPage] = useState(1)
  const [selectedFile, setSelectedFile] = useState<SelectedFile>()

  useEffect(() => {
    if (filesContent.length > 0) {
      const { name, content } = filesContent[0]
      setSelectedFile({ content, name })
      clear()
    }
  }, [filesContent])

  const getInputAlias = (block?: ProcessableBlock) => {
    if (!block || block.blockData.blockType !== 'input') {
      return ''
    }

    const check = block.blocklyBlock.outputConnection?.targetConnection?.getCheck()

    if (!check?.length || check.length <= 1) {
      return ''
    }

    if (check.length > 1) {
      return `( ${check[1]} )`
    }

    return ''
  }

  const setBlockInput = (selectedFile: SelectedFile) => {
    // find the size in megabyte
    const sizeInBytes = (selectedFile.content.length * 3) / 4
    const sizeInMB = sizeInBytes / (1024 * 1024)

    if (sizeInMB > MAX_ALLOWED_FILE_SIZE_MB) {
      enqueueSnackbar('File size should be less than 200MB', { variant: 'error' })
      return
    }
    const outputType = selectedProcessableBlock?.blockData.outputModality
    if (outputType) {
      selectedProcessableBlock.inputs = {
        ...selectedProcessableBlock.inputs,
        [outputType]: selectedFile,
      }
    }
    // Clear to avoid same file being selected again
    // when another block is selected
    clear()
    setSelectedFile(undefined)
  }

  useEffect(() => {
    if (selectedProcessableBlock) {
      setInputPage(1)
      if (selectedFile !== undefined) {
        setBlockInput(selectedFile)
      }
    }
  }, [selectedProcessableBlock, selectedFile])

  const getActionButton = (pageIndex: number) => {
    if (!isInputBlock(selectedProcessableBlock)) {
      const inputContent = getBlockInputContent(pageIndex - 1, selectedProcessableBlock)
      if (!inputContent) {
        return undefined
      }
      if (inputContent?.modality === Modality.Text) {
        return {
          icon: <CopyAll />,
          title: 'Copy',
          label: 'Copy',
          onClick: () => copyToClipBoard(inputContent?.content || ''),
        }
      }

      return {
        icon: <Save />,
        title: 'Save',
        label: 'Save',
        onClick: () => saveFile(inputContent?.content || ''),
      }
    }

    if (isTextInput(selectedProcessableBlock)) {
      return {
        icon: <CopyAll />,
        title: 'Copy',
        label: 'Copy',
        onClick: () =>
          copyToClipBoard(
            getBlockInputContent(pageIndex - 1, selectedProcessableBlock)?.content || '',
          ),
      }
    }

    // do not show upload button for text input block
    if (isInputBlock(selectedProcessableBlock) && isTextInput(selectedProcessableBlock)) {
      return undefined
    }

    return {
      icon: <UploadOutlined />,
      title: 'Upload',
      label: 'Upload file',
      onClick: openFileSelector,
    }
  }

  const showDropZone = () =>
    selectedProcessableBlock &&
    isInputBlock(selectedProcessableBlock) &&
    !isTextInput(selectedProcessableBlock)

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
        ${selectedProcessableBlock === undefined ? 'opacity-30' : ''}
      `}
    >
      <PanelHeader
        title={`${getModalityEmojiOrEmpty(
          getInputModality(inputPage - 1, selectedProcessableBlock),
        )} Input ${getInputAlias(selectedProcessableBlock)}`}
        pagination={{
          currentPage: inputPage,
          totalPages: getInputCount(selectedProcessableBlock),
          onChange: (newPage) => {
            setInputPage(newPage)
          },
          visible: getInputCount(selectedProcessableBlock) > 1,
        }}
        button={getActionButton(inputPage)}
      />
      <div className='w-full h-full box-border flex justify-center items-center overflow-hidden'>
        {hasInput(selectedProcessableBlock) ? (
          <MediaViewer
            modifiable={isInputBlock(selectedProcessableBlock)}
            {...getBlockInputContent(inputPage - 1, selectedProcessableBlock)}
            onMediaModified={(newContent) => {
              setSelectedFile({ name: selectedFile?.name || '', content: newContent })
              clear()
            }}
            key={selectedProcessableBlock?.blocklyBlock.id}
          />
        ) : (
          showDropZone() && (
            <DropZone
              onDrop={setBlockInput}
              modality={selectedProcessableBlock!.blockData.outputModality}
              accepted={getFilePickerType(selectedProcessableBlock)}
            />
          )
        )}
      </div>
    </div>
  )
}
