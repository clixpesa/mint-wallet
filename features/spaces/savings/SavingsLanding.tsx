import { Button, Spacer, Stack, Text, View, XStack, YStack } from "@/ui";
import { MoneyFill, SafeFill } from "@/ui/components/icons";

export function SavingsLanding() {
  return (  
    <View flex={1} items="center" bg="$surface1" py="$3xl">
      <YStack width="92%" p="$md" bg="$surface3" rounded="$xl" opacity={0.85} gap="$xl">
        <XStack gap="$md">
          <Stack bg="$neutral3" height={42}  rounded="$full" width={42} items="center" justify="center">
            <SafeFill size={28} color="$surface1" />
          </Stack>
          <Stack width="83%">
            <Text variant="subHeading2">Get great rates, paid daily</Text>
            <Text variant="body3" color="$neutral2">
              Start saving today and put your cash to work. Earn upto 8.84% APY. 
            </Text>
          </Stack>
        </XStack>
        <XStack gap="$md">
          <Stack bg="$neutral3" height={42}  rounded="$full" width={42} items="center" justify="center">
            <MoneyFill size={28} color="$surface1" />
          </Stack>
          <Stack width="83%">
            <Text variant="subHeading2">Access your money anytime</Text>
            <Text variant="body3" color="$neutral2">
              Withdraw your money anytime with no notice period. 
            </Text>
          </Stack>
        </XStack>
      </YStack>
      <Spacer height="20%"/>
      <Button variant="branded" size="lg" width="85%">Get started</Button>
    </View>
  );
}