import { Box } from '@mui/material'
import React from 'react'

export const MainPanel = ({ children }: React.PropsWithChildren) => {
  return <Box className='h-full w-full'>{children}</Box>
}
