import { createTheme } from '@mui/material'

export const defaultTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: [
        'Avenir',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Helvetica Neue"',
        'sans-serif',
      ].join(','),
    },
  },
})
