import { Stack, Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material'
import { PropsWithChildren } from 'react'
import InfoIcon from '@mui/icons-material/Info'

type WrapWithHelperProps = {
  helpMessage: string
}

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
    fontSize: 14,
  },
})

export const WrapWithHelper = ({
  children,
  helpMessage,
}: PropsWithChildren<WrapWithHelperProps>) => {
  return (
    <Stack
      className='m-2'
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={2}
    >
      {children}
      <CustomWidthTooltip title={helpMessage}>
        <InfoIcon className='cursor-pointer text-zinc-400' />
      </CustomWidthTooltip>
    </Stack>
  )
}
