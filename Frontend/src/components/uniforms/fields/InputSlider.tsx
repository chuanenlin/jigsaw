import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import MuiInput from '@mui/material/Input'
import { Typography } from '@mui/material'

const Input = styled(MuiInput)`
  width: 42px;
`

interface InputSliderProps {
  value?: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: React.ReactNode
  icon?: React.ReactNode
}

const RoundedInput = styled(Input)(() => ({
  background: '#00000000',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '5px',
  height: '45px',
  width: '100%',
  maxHeight: 'none',
  padding: 0,
  '& .MuiInputBase-root': {},
  '& input': {
    padding: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  '& fieldset': {
    borderRadius: '5px',
    border: 'none',
  },
  '&:before': {
    display: 'none',
  },
  '&:after': {
    display: 'none',
  },
}))

export const InputSlider = ({
  icon,
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 10,
  label,
}: InputSliderProps) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value === '' ? 0 : Number(event.target.value))
  }

  const handleBlur = () => {
    if (value < 0) {
      onChange(0)
    } else if (value > 100) {
      onChange(100)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3} alignItems='center'>
        {icon && <Grid item>{icon}</Grid>}
        <Grid item xs>
          <div className='w-full h-full flex flex-col justify-between'>
            <Typography fontSize={'0.9rem'} lineHeight={'1.2rem'}>
              {label}
            </Typography>
            <Slider
              sx={{
                color: '#121212',
                '& .MuiSlider-track': {
                  border: 'none',
                },
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                  backgroundColor: '#121212',
                  '&:before': {
                    boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible, &.Mui-active': {
                    boxShadow: 'none',
                  },
                },
              }}
              size='small'
              step={step}
              min={min}
              max={max}
              value={typeof value === 'number' ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby='input-slider'
            />
          </div>
        </Grid>
        <Grid item xs={3}>
          <RoundedInput
            value={value}
            size='small'
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step,
              min,
              max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
