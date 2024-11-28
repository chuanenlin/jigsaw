import { useTabContext } from '@mui/lab'
import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'

interface CustomTabPanelProps {
  value: string
}

/**
 * A custom tab panel that persists the state of the tab panel.
 * the default tab panel does not keep state when tabs are changed.
 * https://github.com/mui/material-ui/issues/21250
 */
const CustomTabPanel = ({ children, value }: PropsWithChildren<CustomTabPanelProps>) => {
  const context = useTabContext()

  if (context === null) {
    throw new TypeError('No TabContext provided')
  }
  const tabId = context.value

  return (
    <Box
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        visibility: value === tabId ? 'visible' : 'hidden',
      }}
    >
      {children}
    </Box>
  )
}

export default CustomTabPanel
