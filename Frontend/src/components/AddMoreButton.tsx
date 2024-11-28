import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export interface AddMoreButtonProps {
  onClick: () => void
}

const AddMoreButton = ({ onClick }: AddMoreButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type='submit'
      sx={{ backgroundColor: '#E5E5EA', px: 8, color: 'black' }}
      startIcon={<AddIcon />}
    >
      Add More
    </Button>
  )
}

export default AddMoreButton
