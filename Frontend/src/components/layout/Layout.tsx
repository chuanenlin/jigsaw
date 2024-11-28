import * as React from 'react'
import Stack from '@mui/material/Stack'
import { Box } from '@mui/material'
import { HelperPanel } from './HelperPanel'
import { MainPanel } from './MainPanel'

interface LayoutProps {
  SidePanelContent: React.ReactElement
  MainPanelContent: React.ReactElement
  LeftHelperPanelContent: React.ReactElement
  RightHelperPanelContent: React.ReactElement
}

export const Layout = ({
  LeftHelperPanelContent,
  RightHelperPanelContent,
  MainPanelContent,
}: LayoutProps) => {
  return (
    <Stack direction='row' divider={<Box sx={{ width: '15px' }} />} sx={{ height: '100%' }}>
      <Box
        sx={{
          height: '100%',
          width: '100%',
        }}
      >
        <Stack
          direction={'column'}
          sx={{ height: '100%' }}
          divider={<Box sx={{ height: '15px' }} />}
        >
          <Stack direction={'column'} sx={{ height: '70%' }}>
            <MainPanel>{MainPanelContent}</MainPanel>
          </Stack>
          <Stack
            direction={'row'}
            sx={{ height: '30%', overflow: 'hidden' }}
            divider={<Box sx={{ width: '15px' }} />}
          >
            <HelperPanel>{LeftHelperPanelContent}</HelperPanel>
            <HelperPanel>{RightHelperPanelContent}</HelperPanel>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}
