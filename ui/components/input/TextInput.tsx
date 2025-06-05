
import { useThemeColors } from "@/ui/hooks/useThemeColors"
import React, { forwardRef } from "react"
import { Input, InputProps } from "tamagui"



export const TextInput = forwardRef<Input, InputProps>(function _TextInput(
  { onChangeText, onBlur, ...rest },
  ref,
) {
  const colors = useThemeColors()

  return (
    <Input
      ref={ref}
      autoComplete="off"
      bg="$surface1"
      rounded="$md"
      color="$neutral1"
      height="auto"
      placeholderTextColor="$neutral3"
      px="$md"
      py="$sm"
      selectionColor={colors.neutral3.val}
      focusStyle={{
        borderWidth: 2,
        borderColor: "$surface3",
        outlineWidth: 0
      }}
      hoverStyle={{
        borderWidth: 1, borderColor: '$surface3', outlineWidth: 0
      }}
      
      onBlur={onBlur}
      onChangeText={onChangeText}
      {...rest}
    />
  )
})