import { Text, TextProps } from '@/ui/components/text/Text'
import { usePostTextElementPositionProps } from '@/ui/utils/layout'
import { isDesktopApp } from '@/utilities/platform'
import type { JSX } from 'react'
import { Stack, StackProps, XStack } from 'tamagui'

type ElementAfterTextProps = {
  element?: JSX.Element
  text: string
  wrapperProps?: StackProps
  textProps?: TextProps
}

const DEFAULT_TEXT_PROPS: TextProps = {
  color: '$neutral1',
  variant: 'body2',
}

export function ElementAfterText({ element, text, wrapperProps, textProps }: ElementAfterTextProps): JSX.Element {
  const { postTextElementPositionProps, onTextLayout } = usePostTextElementPositionProps()

  if (isDesktopApp) {
    return (
      <XStack items="center" {...wrapperProps}>
        <Text {...DEFAULT_TEXT_PROPS} {...textProps}>
          {text}
        </Text>
        {element}
      </XStack>
    )
  } else {
    return (
      <XStack items="center" pr={postTextElementPositionProps ? '$xl' : undefined} {...wrapperProps}>
        <Text {...DEFAULT_TEXT_PROPS} onTextLayout={onTextLayout} {...textProps}>
          {text}
        </Text>
        <Stack {...postTextElementPositionProps}>{element}</Stack>
      </XStack>
    )
  }
}
