import { Box, List, ListItem, Paper } from '@mui/material'
import InputBox from './input-output/InputBox'
import AddMoreButton from './AddMoreButton'
import { useState } from 'react'
import DragHandleIcon from '@mui/icons-material/DragHandle'

const ProgrammerPanel = () => {
  const [inputs, setInputs] = useState(['Input 1', 'Input 2'])

  const addNewInput = () => {
    setInputs([...inputs, 'Input ' + (inputs.length + 1)])
  }

  return (
    <Box className='p-2'>
      <List>
        {inputs.map((value) => (
          <ListItem key={value} disableGutters>
            <InputBox multiline={true} startAdornment={<DragHandleIcon />} value={value} />
          </ListItem>
        ))}
      </List>
      <Paper sx={{ position: 'absolute', bottom: 10, left: 10 }} elevation={3}>
        <AddMoreButton onClick={addNewInput} />
      </Paper>
    </Box>
  )
}

export default ProgrammerPanel
