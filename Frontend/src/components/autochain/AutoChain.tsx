import React, { useState } from 'react'
import { Button } from '@mui/material'
import InputBox from '../input-output/InputBox'

interface AutoChainProps {
  onSubmit?: (prompt: string) => void
}

export const AutoChain = ({ onSubmit }: AutoChainProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (
    event,
  ) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = () => {
    onSubmit?.(inputValue)
  }

  return (
    <form className='flex flex-row w-full h-auto align-middle justify-between'>
      <InputBox
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Describe your design task...'
        className='flex-grow rounded-full mr-5'
      />
      <Button
        variant='contained'
        onClick={handleSubmit}
        className='rounded-full w-40 bg-black custom-assembly-button'
      >
        <span>{'🪄 Assemble'}</span>
      </Button>
    </form>
  )
}
