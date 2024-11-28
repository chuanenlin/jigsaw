import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import { Box, Stack } from '@mui/material'
import Tab from '@mui/material/Tab'
import * as React from 'react'
import ProgrammerPanel from './ProgrammerPanel'
import RunButton from './RunButton'
import { Workspace } from './Workspace'
import CustomTabPanel from './CustomTabPanel'
import { useWorkspaceContext } from '../context'

const SceneTabs = () => {
  const [value, setValue] = React.useState('1')
  const { processBlocks } = useWorkspaceContext()

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <Box className='flex flex-col h-full'>
        <Box>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems={'center'}
            sx={{ bgcolor: 'transparent', pr: 2 }}
          >
            <TabList
              TabIndicatorProps={{ style: { display: 'none' } }}
              onChange={handleTabChange}
              sx={{
                bgcolor: '#E5E5EA',
                color: '#8E8E93',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                border: '1px solid #8E8E93',
                borderBottom: 0,
                '.workspace-tab': {
                  borderBottom: 'none',
                  borderRight: '1px solid #8E8E93',
                },
                '.programmer-tab': {
                  borderBottom: 'none',
                },
                '.Mui-selected': {
                  backgroundColor: 'white',
                  color: 'black',
                },
              }}
            >
              <Tab className='workspace-tab' label='Workspace' value='1' />
              <Tab className='programmer-tab' label='Programmer' value='2' />
            </TabList>
            <RunButton onClick={processBlocks} />
          </Stack>
        </Box>
        <Box
          className='box-border flex-grow overflow-hidden relative'
          sx={{
            boxSizing: 'border-box',
            border: '1px solid',
            borderColor: '#8E8E93',
            borderRadius: '0 16px 16px 16px',
          }}
        >
          <CustomTabPanel value='1'>
            <Workspace />
          </CustomTabPanel>

          <CustomTabPanel value='2'>
            <ProgrammerPanel />
          </CustomTabPanel>
        </Box>
      </Box>
    </TabContext>
  )
}

export default SceneTabs
