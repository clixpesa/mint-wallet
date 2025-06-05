import { useThemeColors } from "@/ui/hooks/useThemeColors"
import { OtpInput, OtpInputProps } from "react-native-otp-entry"
import { Stack } from "tamagui"


export const CodeInput = ({...rest}: OtpInputProps) => {
  const colors = useThemeColors()
  return (
    <Stack px="$4xl" >
      <OtpInput 
        focusColor={colors.accent1.val}
        hideStick={true}
        blurOnFilled={true}
        theme={{
          pinCodeContainerStyle: {
            borderWidth: 2,
            height: 54,
            backgroundColor: colors.surface1.val
          },
          pinCodeTextStyle: {
            color: colors.neutral1.val
          }
        }}
        {...rest}
      />
  </Stack>
  )
}