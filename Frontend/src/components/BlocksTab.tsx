import { Box, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Modality } from '../types'
import { modalityColors } from '../constants'

// a circular shape with a color
interface ModalityIconProps {
  color: string
  text?: string
}

const ModalityIcon = ({ color, text }: ModalityIconProps) => {
  return (
    <div
      className='
        w-10
        h-10
        rounded-full
        border-solid
        border
        border-gray-500
        text-center
      '
      style={{ backgroundColor: color }}
    >
      {text && (
        <Typography variant='h4' className='text-center text-black'>
          {text}
        </Typography>
      )}
    </div>
  )
}

interface BlocksTabProps {
  onChange: (tabKey: Modality) => void
}

const modalityValues = Object.values(Modality)

export const BlocksTab = ({ onChange }: BlocksTabProps) => {
  const [currentTab, setCurrentTab] = useState(0)

  const modalityTabs = modalityValues.map((modality) => (
    <Tab
      label={modality}
      key={modality}
      icon={
        <ModalityIcon
          text={modality === Modality.Custom ? '?' : ''}
          color={modalityColors[modality]}
        />
      }
    />
  ))

  const handleTabChange = (event: React.ChangeEvent<unknown>, newTab: number) => {
    setCurrentTab(newTab)
    onChange(modalityValues[newTab])
  }

  return (
    <div className='flex h-full'>
      <Box
        className='
          bg-white
          overflow-hidden
          h-full
        '
      >
        <Tabs
          sx={{
            // change the color when the item is selected to light gray instead of blue
            '& .Mui-selected': {
              color: 'black',
              backgroundColor: '#E5E5EA',
            },
            // change the color of when clicking the item to light gray and text to black
            '& .Mui-selected:hover': {
              color: 'black',
              backgroundColor: '#E5E5EA',
            },
            // change the color of when hovering the item to light gray and text to black
            '& .MuiTab-root:hover': {
              color: 'black',
              backgroundColor: '#E5E5EA',
            },
            // set the ripple color to dark gray
            '& .MuiTouchRipple-root': {
              color: '#8E8E93',
            },
            // remove the moving bar
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            // change the color to bkack always
            '& .MuiTab-root': {
              color: 'black',
            },
            // keep text black even after selection
            '& .Mui-selected .MuiTab-wrapper': {
              color: 'black',
            },
            // reduce the gap between the items
            '& .MuiTabs-flexContainer': {
              gap: '0px',
            },
            // item is selected and "NOT hovered", but text color is blue, make it black
            '& .Mui-selected:not(:hover)': {
              color: 'black',
            },
          }}
          orientation='vertical'
          variant='scrollable'
          value={currentTab}
          onChange={handleTabChange}
          aria-label='Filter Tabs'
          className='h-full text-black'
        >
          {modalityTabs}
        </Tabs>
      </Box>
    </div>
  )
}
