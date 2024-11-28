import { Backdrop, Box, Button, Divider, Stack, Typography } from '@mui/material'
import { BlocklyComponent } from './blockly/BlocklyComponent'
import { ParamsPanel } from './ParamsPanel'
import { AutoChain } from './autochain'
import { RunStatus, StatusSource, useWorkspaceContext } from '../context/WorkspaceContext'
import RunButton from './RunButton'
import { BlockSearch } from './block-search'
import { LoadingIndicator } from './atoms/LoadingIndicator'
import { styled } from '@mui/material/styles'

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(8px)',
  zIndex: theme.zIndex.drawer + 1,
}));

const CancelButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  borderRadius: '24px',
  padding: '8px 24px',
  color: theme.palette.common.white,
  borderColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: theme.palette.common.white,
  },
}));

export const Workspace = () => {
  const {
    workspace,
    selectedBlocklyBlock,
    getSelectedBlockParameters,
    onAutoChain: autoChain,
    workspaceStatus,
    processBlocks,
    setBlockFilter,
    onBlockSearch,
    cancelBlocksProcess,
  } = useWorkspaceContext()

  const onAutoChain = async (prompt: string) => {
    if (!workspace) {
      throw new Error('Workspace is not initialized')
    }

    await autoChain(prompt)
  }

  // Extract model info from message
  const getModelInfo = (message: string) => {
    const match = message?.match(/\((\d+)\/(\d+)\)\s*(.+)/)
    if (match) {
      const current = parseInt(match[1])
      const total = parseInt(match[2])
      const name = match[3]
      return {
        current,
        total,
        name,
        progress: (current / total) * 100
      }
    }
    return null
  }

  // Get list of all models and their status
  const getModelProgress = (message: string) => {
    const modelInfo = getModelInfo(message)
    if (!modelInfo) return []

    const models = []
    for (let i = 1; i <= modelInfo.total; i++) {
      const status = i < modelInfo.current ? 'completed' as const :
                    i === modelInfo.current ? 'current' as const : 'pending' as const
      models.push({
        name: modelInfo.name.replace(/\s*\(.*\)/, ''),  // Remove any parentheses from name
        status
      })
    }
    return models
  }

  const modelInfo = getModelInfo(workspaceStatus.message || '')
  const modelProgress = getModelProgress(workspaceStatus.message || '')

  const processBlocksWithRetry = async () => {
    const maxRetries = 3;
    const baseDelay = 1000; // 1 second

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        await processBlocks();
        return;
      } catch (error: any) {
        if (error?.response?.status === 429 && attempt < maxRetries - 1) {
          // Wait with exponential backoff
          await new Promise(resolve => setTimeout(resolve, baseDelay * Math.pow(2, attempt)));
          continue;
        }
        throw error;
      }
    }
  };

  return (
    <div
      className='
      w-full
      h-full
      rounded-2xl
      overflow-hidden
      border
      border-solid
      border-neutral-300
      box-border
      relative
    '
    >
      <Stack className='w-full h-full' direction={'row'}>
        <StyledBackdrop
          open={workspaceStatus.runStatus === RunStatus.LOADING}
        >
          <div className='flex flex-col justify-center items-center h-full w-full max-w-xl mx-auto px-8'>
            <LoadingIndicator
              progress={modelInfo?.progress}
              message={modelInfo ? `Processing ${modelInfo.name}` : 'Processing...'}
              currentStep={modelInfo?.current}
              totalSteps={modelInfo?.total}
              modelProgress={modelProgress}
              tips={[
                'AI models are working their magic...',
                'This might take a few moments...',
                'Creating something amazing...',
                'Processing complex algorithms...',
                'Analyzing and generating content...',
                modelInfo ? `Processing model ${modelInfo.current} of ${modelInfo.total}` : 'Processing...',
              ]}
            />
            
            {workspaceStatus.runStatus === RunStatus.LOADING &&
              workspaceStatus.source === StatusSource.BLOCK_PROCESSOR && (
                <CancelButton
                  variant='outlined'
                  onClick={cancelBlocksProcess}
                >
                  Cancel Process
                </CancelButton>
            )}
          </div>
        </StyledBackdrop>
        
        <div
          style={{
            left: '528px', // This is the width of blockly's toolbox
          }}
          className='
            fixed
            m-2
            ml-10
            mr-10
            flex
            flex-row
            align-middle
            justify-between
            z-50
            right-1/4
            h-10
          '
        >
          <AutoChain onSubmit={onAutoChain} />
          <Divider className='ml-4 mr-4' orientation='vertical' />
          <RunButton onClick={processBlocksWithRetry} />
        </div>
        <BlocklyComponent />
        <BlockSearch
          onFilter={(filter) => {
            setBlockFilter(filter)
          }}
          onSearch={(search) => {
            onBlockSearch(search)
          }}
        />
        <Box
          className={`
          absolute
          h-full
          top-0
          right-0
          z-50
          w-1/4
          min-w-1/4
          bg-neutral-100
          bg-opacity-70
          border-0
          border-l
          border-solid
          border-neutral-300
          ${getSelectedBlockParameters()?.schema === undefined ? 'hidden' : ''}
        `}
        >
          <ParamsPanel
            key={selectedBlocklyBlock?.id}
            schema={getSelectedBlockParameters()?.schema}
            model={getSelectedBlockParameters()?.model}
            title={selectedBlocklyBlock?.type}
          />
        </Box>
      </Stack>
    </div>
  )
}
