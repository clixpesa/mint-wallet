import MaskedView from '@react-native-masked-view/masked-view'
import type { JSX } from 'react'
import { LinearGradient } from 'tamagui/linear-gradient'
import { GradientTextProps } from './GradientText'
import { Text } from './Text'


export function GradientText({ gradient, children, ...props }: GradientTextProps): JSX.Element {
  return (
    <MaskedView maskElement={<Text {...props}>{children}</Text>}>
      <LinearGradient {...gradient}>
        <Text {...props} opacity={0}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  )
}
