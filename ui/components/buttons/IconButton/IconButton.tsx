import { forwardRef } from 'react'
import { styled, type TamaguiElement } from 'tamagui'
import { CustomButtonFrame } from '../Button/components/CustomButtonFrame/CustomButtonFrame'
import { ThemedIcon } from '../Button/components/ThemedIcon'
import { ThemedSpinningLoader } from '../Button/components/ThemedSpinnerLoader'
import { useButtonAnimationOnChange } from '../Button/hooks/useButtonAnimationOnChange'
import type { ButtonProps } from '../Button/types'
import { getIsButtonDisabled } from '../Button/utils/getIsButtonDisabled'

// Helper to omit keys from a type that have a certain string (lowercased) in the name
type OmitIncludingToLowercase<T, Str extends string> = {
  [K in keyof T as K extends string
    ? Lowercase<K> extends `${string}${Lowercase<Str>}${string}`
      ? never
      : K
    : never]: T[K]
}

// For example, this includes `minHeight` as well as `height` (as well as ~60 other props)
type OmittedButtonProps = OmitIncludingToLowercase<ButtonProps, 'flex' | 'icon' | 'size' | 'height' | 'width'>

export type IconButtonProps = {
  icon: Required<ButtonProps['icon']>
  size?: ButtonProps['size']
} & OmittedButtonProps

const IconButtonFrame = styled(CustomButtonFrame, {
  variants: {
    size: {
      xxsmall: {
        p: '$xs',
        rounded: '$md',
      },
      xsmall: {
        p: '$vs',
        rounded: '$md',
      },
      small: {
        p: '$vs',
        rounded: '$md',
      },
      medium: {
        p: '$sm',
        rounded: '$lg',
      },
      large: {
        p: '$md',
        borderRadius: '$vl',
      },
    },
  } as const,
})

export const IconButton = forwardRef<TamaguiElement, IconButtonProps>(function IconButton(
  {
    icon,
    shouldAnimateBetweenLoadingStates = true,
    loading,
    isDisabled: propDisabled,
    size = 'md',
    variant = 'default',
    emphasis = 'primary',
    focusScaling = 'equal:smaller-button',
    ...props
  },
  ref,
) {
  useButtonAnimationOnChange({
    shouldAnimateBetweenLoadingStates,
    loading,
  })

  const isDisabled = getIsButtonDisabled({ isDisabled: propDisabled, loading })

  return (
    <IconButtonFrame
      ref={ref}
      fill={false}
      isDisabled={isDisabled}
      size={size}
      variant={variant}
      emphasis={emphasis}
      focusScaling={focusScaling}
      {...props}
    >
      <ThemedIcon isDisabled={isDisabled} emphasis={emphasis} size={size} variant={variant} typeOfButton="icon">
        {loading ? undefined : icon}
      </ThemedIcon>

      {loading ? (
        <ThemedSpinningLoader
          isDisabled={isDisabled}
          emphasis={emphasis}
          size={size}
          variant={variant}
          typeOfButton="icon"
        />
      ) : null}
    </IconButtonFrame>
  )
})
