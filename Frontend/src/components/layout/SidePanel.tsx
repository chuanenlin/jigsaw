import { Box } from '@mui/system'
import * as React from 'react'

const SidePanel = ({ children }: React.PropsWithChildren) => {
  return <Box className='w-full h-full box-border'>{children}</Box>
}

export default SidePanel
