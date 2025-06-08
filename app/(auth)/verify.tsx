import { HeaderBackButton } from "@/components/Buttons/HeaderNavButtons";
import { ResendTimer } from "@/features/essentials";
import { AnimatedYStack, CodeInput, SpinningLoader, Stack, Text, View, XStack, YStack } from "@/ui";
import { RegisterHeader } from "@/ui/assets";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Image } from "react-native";

export default function VerifyScreen() {
  const params = useLocalSearchParams<{ source: string; entry: string }>();
  const codeInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleVerification = async (code: string) => {
    try {
      setTimeout(()=>{
        console.log(code)
        setIsLoading(false)
        router.push("/(auth)/security")
      }, 2000)
      
    }catch(e){
      console.warn(e)
    }
  }

  const handleResendCode = async () => {
		if (params.source === "phone") {
			//await sendPhoneOTP(params.entry);
		} else {
			//await sendEmailOTP(params.entry);
		}
	};
  return (
       <View flex={1} bg="$surface1" items="center">
         <AnimatedYStack grow={1} width="95%" items="center" gap="$xl" >
          <XStack gap="$2xl" items="center" width="95%" >
            <HeaderBackButton />
            <XStack gap="$sm" py="$xl" width="100%">
              <Stack bg="$tealThemed" height={6} width="15%" rounded="$2xl" />
              <Stack bg="$accent1" height={6} width="15%" rounded="$2xl" />
              <Stack bg="$tealThemed" height={6} width="15%" rounded="$2xl" />
              <Stack bg="$tealThemed" height={6} width="15%" rounded="$2xl" />
            </XStack>
           </XStack>
           <Image resizeMode="contain" source={RegisterHeader} style={{width: "100%", height: "15%", opacity: 0.85}}  />
           <YStack width="95%" items="center" gap="$md" >
           <Text allowFontScaling={false} text="center" variant="subHeading1">
             {`Verify your ${params.source === "phone" ? "phone number" : "email"}`}
           </Text>
           <Text color="$neutral2" text="center" variant="subHeading2" width="85%">
             {`Enter the verification code we sent to:  ${params.entry}`}
           </Text>
           </YStack>
          <CodeInput ref={codeInputRef} onFilled={(code) => {setIsLoading(true),handleVerification(code)}} blurOnFilled/>
          {isLoading ? <SpinningLoader size={28}/> : null}
          <ResendTimer onResend={handleResendCode} isSourcePhone={params.source === "phone"}/>
         </AnimatedYStack>
       </View>
  )
}
