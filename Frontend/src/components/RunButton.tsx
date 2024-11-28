import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import { Button } from '@mui/material'

interface RunButtonProps {
  onClick?: () => void
}

const RunButton = ({ onClick }: RunButtonProps) => {
  return (
    <Button
      className='rounded-full custom-run-button w-40 py-1'
      variant='contained'
      color='success'
      // startIcon={<DirectionsRunIcon />}
      onClick={onClick}
    >
      🏃 Run
    </Button>
  )
}

export default RunButton
