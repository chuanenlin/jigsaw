import { IconButton, Popover, Typography } from '@mui/material'
import InputBox from '../input-output/InputBox'
import { useState } from 'react'
import { FilterAlt, SearchOutlined } from '@mui/icons-material'
import { CreateForm } from '../../uniform/CreateForm'
import { JSONSchemaType } from 'ajv'

export interface BlocklistFilter {
  maxRuntine: number
  hardwareRequirements: {
    cpu: number
    ram: number
    gpu: number
  }
}

const schema: JSONSchemaType<BlocklistFilter> = {
  type: 'object',
  properties: {
    maxRuntine: {
      type: 'integer',
      title: 'Max Runtime',
      default: 0,
    },
    hardwareRequirements: {
      type: 'object',
      properties: {
        cpu: {
          type: 'integer',
          title: 'CPU',
          default: 2,
        },
        ram: {
          type: 'integer',
          title: 'RAM',
          default: 256,
        },
        gpu: {
          type: 'integer',
          title: 'GPU',
          default: 1,
        },
      },
      required: [],
    },
  },
  required: [],
}

interface BlockSearchProps {
  onSearch?: (keywork: string) => void
  onFilter?: (value: BlocklistFilter) => void
}

export const BlockSearch = ({ onFilter, onSearch }: BlockSearchProps) => {
  const [inputValue, setInputValue] = useState('')
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [model, setModel] = useState({})

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (
    event,
  ) => {
    setInputValue(event.target.value)
  }

  const handleSearch = () => {
    onSearch?.(inputValue)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onFilterSubmit = (values: unknown) => {
    onFilter?.(values as BlocklistFilter)
    setModel(values as BlocklistFilter)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'filter-popover' : undefined

  return (
    <div
      style={{
        /**
         * trying to match the flyout styles
         */
        width: '472.69px',
        height: '50px',
        left: '62px',
        top: '0px',
        bottom: '10px',
        background: '#f9f9f9',
        borderLeft: '1px solid hsla(0, 0%, 0%, 0.15)',
        borderRight: '1px solid hsla(0, 0%, 0%, 0.15)',
      }}
      className={`
    absolute
    z-50
    flex
    flex-row
    align-middle
    justify-between
    pl-5
    pr-5
    pt-2
    box-border
    overflow-hidden
  `}
    >
      <InputBox
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Search for a puzzle piece...'
        className='flex-grow rounded-full mr-5 text-sm'
      />
      <IconButton onClick={handleSearch}>
        <SearchOutlined />
      </IconButton>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <FilterAlt />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }}>Filter Options</Typography>
        <div style={{ padding: '20px', paddingTop: '5px' }} className='w-full h-full box-border'>
          <CreateForm schema={schema} model={model} onSubmit={onFilterSubmit} />
        </div>
      </Popover>
    </div>
  )
}
