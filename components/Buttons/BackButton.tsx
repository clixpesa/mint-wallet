import { ColorTokens, TouchableArea, TouchableAreaProps } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { BackButtonView } from '../layout/BackButtonView'

type Props = {
  size?: number
  color?: ColorTokens
  showButtonLabel?: boolean
  onPressBack?: () => void
} & TouchableAreaProps

export function BackButton({ onPressBack, size, color, showButtonLabel, ...rest }: Props): JSX.Element {
  const navigation = useNavigation()

  const goBack = onPressBack
    ? onPressBack
    : (): void => {
        navigation.goBack()
      }
  return (
    <TouchableArea
      items="center"
      hitSlop={24}
      onPress={goBack}
      {...rest}
    >
      <BackButtonView color={color} showButtonLabel={showButtonLabel} size={size} />
    </TouchableArea>
  )
}
