import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'
import { Chip, IconButton, Tooltip } from '@mui/material'
import { ReactElement, useCallback, useEffect, useState } from 'react'

interface PanelHeaderProps {
  title: string
  button?:
    | {
        title?: string
        onClick: () => void
        icon: ReactElement
        label: string
      }
    | false
  pagination?: {
    currentPage?: number
    totalPages: number
    visible?: boolean
    onChange: (page: number) => void
  }
}

export const PanelHeader = ({ button, title, pagination }: PanelHeaderProps) => {
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage || 1)

  useEffect(() => {
    if (pagination?.currentPage) {
      setCurrentPage(pagination?.currentPage)
    }
  }, [pagination?.currentPage])

  const handlePrevPage = () => {
    if (!pagination || currentPage === undefined) return

    const newCurPage = currentPage - 1
    setCurrentPage(newCurPage)
    pagination.onChange(newCurPage)
  }

  const handleNextPage = () => {
    if (!pagination || currentPage === undefined) return

    const newCurPage = currentPage + 1
    setCurrentPage(newCurPage)
    pagination.onChange(newCurPage)
  }

  const canGoPrev = useCallback(() => {
    if (currentPage === undefined) return false

    return currentPage > 1
  }, [currentPage])

  const canGoNext = useCallback(() => {
    if (currentPage === undefined || !pagination) return false

    return currentPage < pagination?.totalPages
  }, [currentPage, pagination?.totalPages])

  return (
    <div
      className='
        h-12
        w-full
        py-1
        border-0
        border-b
        border-solid
        border-b-neutral-500
        box-border
        flex-shrink-0
        flex
        flex-row
        justify-between
        align-middle
    '
    >
      <div className='w-20 flex justify-start items-center px-2'>
        {canGoPrev() && pagination && pagination.visible && (
          <IconButton onClick={handlePrevPage}>
            <ArrowBackIosNewOutlined color='action' />
          </IconButton>
        )}
      </div>
      <div className='h-full flex justify-center align-middle items-center'>
        {pagination?.visible ? `${title} ${currentPage}/${pagination?.totalPages}` : title}
      </div>
      <div className='w-20 flex justify-end align-middle items-center px-2'>
        <div className='h-full flex items-center px-2'>
          {button && (
            <Tooltip title={button.title}>
              <Chip
                variant='outlined'
                // icon={button.icon}
                label={button.label}
                onClick={button.onClick}
              />
            </Tooltip>
          )}
        </div>
        <div className='h-full flex items-center'>
          {canGoNext() && pagination && pagination.visible && (
            <IconButton onClick={handleNextPage}>
              <ArrowForwardIosOutlined color='action' />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  )
}
