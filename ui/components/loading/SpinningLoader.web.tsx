import { CircleSpinner, EmptySpinner } from '@/ui/components/icons'
import type { JSX } from 'react'
import { Stack } from 'tamagui'
import { SpinningLoaderProps } from './types'

const rotateCSS = `
  @keyframes rotate360 {
      from {
          transform: rotate(0deg);
      }
      to {
          transform: rotate(360deg);
      }
  }

  .RotateElement {
      animation: rotate360 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
      transform-origin: center center;
  }
`

export function SpinningLoader({ size = 20, disabled, color, unstyled }: SpinningLoaderProps): JSX.Element {
  if (disabled) {
    return <EmptySpinner color="$neutral3" size={size} />
  }

  if (unstyled) {
    return (
      <>
        <style>{rotateCSS}</style>
        <Stack className="RotateElement">
          <CircleSpinner color={color} size={size} />
        </Stack>
      </>
    )
  }

  return (
    <>
      <style>{rotateCSS}</style>
      <Stack items="center" height={size} content="center" marginEnd={2} marginStart={2} width={size}>
        <Stack height={size} minH={8} minW={8} p={1.66667} position="relative" width={size}>
          <Stack className="RotateElement" position="absolute">
            <CircleSpinner color={color} size={size} />
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
