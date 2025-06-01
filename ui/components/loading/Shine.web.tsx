import type { JSX } from 'react'
import { Stack } from 'tamagui'
import type { ShineProps } from './types'

const shineKeyframe = `
  @keyframes shine {
    from {
      -webkit-mask-position: 150%;
    }
    to {
      -webkit-mask-position: -50%;
    }
  }
`

export function Shine({ children, disabled, ...rest }: ShineProps): JSX.Element {
  return (
    <>
      <style>{shineKeyframe}</style>
      <Stack
        {...rest}
        style={
          disabled
            ? undefined
            : {
                WebkitMaskImage: `linear-gradient(-75deg, rgba(0,0,0,0.5) 30%, #000 50%, rgba(0,0,0,0.5) 70%)`,
                WebkitMaskSize: '200%',
                animationName: 'shine',
                animationDuration: '1s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDelay: rest['$platform-web']?.animationDelay,
              }
        }
      >
        {children}
      </Stack>
    </>
  )
}
