import { BlockSvg } from 'blockly/core'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

export interface TooltipInfo {
  blockSvg?: BlockSvg
  event?: MouseEvent
  tooltipHovered?: boolean
}

export interface TooltipContextProps {
  tooltipInfo?: TooltipInfo
  setTooltipInfo: (tooltipInfo?: TooltipInfo) => void
}

export const TooltipContext = createContext<TooltipContextProps | undefined>(undefined)

export const useTooltipContext = () => useContext(TooltipContext) as TooltipContextProps

export const TooltipContextProvider = ({ children }: PropsWithChildren) => {
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo>()

  return (
    <TooltipContext.Provider
      value={{
        setTooltipInfo,
        tooltipInfo,
      }}
    >
      {children}
    </TooltipContext.Provider>
  )
}
