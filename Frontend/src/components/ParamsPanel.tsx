import { Box, Divider, Typography } from '@mui/material'
import { CreateForm } from '../uniform/CreateForm'
import { UnknownObject } from 'uniforms'
import { SomeJSONSchema } from 'ajv/dist/types/json-schema'
import { useWorkspaceContext } from '../context'

interface ParamsPanelProps {
  title?: string
  schema?: SomeJSONSchema
  model?: UnknownObject
}

export const ParamsPanel = ({ model = {}, schema, title }: ParamsPanelProps) => {
  const { selectedBlocklyBlock, setBlockParametersModel } = useWorkspaceContext()
  const onSubmit = (values: UnknownObject) => {
    if (selectedBlocklyBlock) {
      setBlockParametersModel(selectedBlocklyBlock, values)
    }
  }

  return (
    <Box className='w-full h-full flex flex-col'>
      {title && (
        <Box className='w-full h-12 flex flex-col justify-around'>
          <Typography variant='subtitle1' align='center' className='font-extrabold'>
            {title || ''}
          </Typography>
          <Divider orientation='horizontal' />
        </Box>
      )}
      <Box
        className='
          w-full
          flex-grow
          p-2
          overflow-y-scroll
          scrollbar-thin
          scrollbar-thumb-gray-300
          scrollbar-track-white
          scrollbar-rounded-md
          h-0
        '
      >
        {schema && <CreateForm schema={schema} model={model} onSubmit={onSubmit} />}
      </Box>
    </Box>
  )
}
