import { useThemeColors } from '@/ui/hooks/useThemeColors'
import { opacify } from '@/ui/utils/opacify'
import { useEvent } from '@/utilities/react/hooks'
import { ONE_SECOND_MS } from '@/utilities/time/time'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useMemo, useState } from 'react'
import { LayoutRectangle, StyleSheet } from 'react-native'
import Reanimated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { Stack } from 'tamagui'
import { ShineProps } from './types'

const SHIMMER_DURATION = ONE_SECOND_MS * 2

const LINEAR_GRADIENT_END = { x: 1, y: 0 }
const LINEAR_GRADIENT_START = { x: 0, y: 0 }

const BLACK_HEX_COLOR = '#000000'

export function Shine({ children, disabled }: ShineProps): React.JSX.Element {
  const colors = useThemeColors()

  const [layout, setLayout] = useState<LayoutRectangle | null>()
  const xPosition = useSharedValue(0)

  useEffect(() => {
    xPosition.value = withRepeat(withTiming(1, { duration: SHIMMER_DURATION }), Infinity, false)
  }, [xPosition])

  const animatedStyle = useAnimatedStyle(() => ({
    ...StyleSheet.absoluteFillObject,
    transform: [
      {
        translateX: interpolate(xPosition.value, [0, 1], [layout ? -layout.width : 0, layout ? layout.width : 0]),
      },
    ],
  }))

  const handleOnLayout = useEvent(
    (event: { nativeEvent: { layout: React.SetStateAction<LayoutRectangle | null | undefined> } }): void => {
      setLayout(event.nativeEvent.layout)
    },
  )

  const gradientColors: [string, string, string] = useMemo(() => {
    const hexColorForOpacifying = ((): string => {
      const maybeColor = colors.black.val

      if (maybeColor.startsWith('#') && colors.black.val.length === 7) {
        return maybeColor
      }

      return BLACK_HEX_COLOR
    })()

    return [opacify(0, hexColorForOpacifying), opacify(44, hexColorForOpacifying), opacify(0, hexColorForOpacifying)]
  }, [colors.black.val])

  const maskedViewStyle = useMemo(() => ({ width: layout?.width, height: layout?.height }), [layout])

  if (disabled) {
    return children
  }

  if (!layout) {
    return (
      <Stack opacity={0} onLayout={handleOnLayout}>
        {children}
      </Stack>
    )
  }

  return (
    <MaskedView maskElement={children} style={maskedViewStyle}>
      <Stack flex={1} bg="$neutral2" height="100%" overflow="hidden" />
      <Reanimated.View style={animatedStyle}>
        <LinearGradient
          colors={gradientColors}
          end={LINEAR_GRADIENT_END}
          start={LINEAR_GRADIENT_START}
          style={StyleSheet.absoluteFill}
        />
      </Reanimated.View>
    </MaskedView>
  )
}
