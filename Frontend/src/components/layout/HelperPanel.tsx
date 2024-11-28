import { Box } from '@mui/material'
import React from 'react'

export const HelperPanel = ({ children }: React.PropsWithChildren) => {
  return <Box className='h-full w-1/2 box-border overflow-hidden'>{children}</Box>
}
