import { Button, Spacer, Stack, Text, View, XStack, YStack } from "@/ui";
import { GroupFill, RoscaFill } from "@/ui/components/icons";

export function GroupsLanding() {
  return (  
    <View flex={1} items="center"  bg="$surface1" py="$3xl">
      <YStack width="92%" p="$md" bg="$surface3" rounded="$xl" opacity={0.85} gap="$xl" >
        <XStack gap="$md">
          <Stack bg="$neutral3" height={42}  rounded="$full" width={42} items="center" justify="center">
            <GroupFill size={32} color="$surface1" />
          </Stack>
          <Stack width="83%">
            <Text variant="subHeading2">Save with family and friends</Text>
            <Text variant="body3" color="$neutral2">
              Save in groups and reach your goals together or challenge one another. 
            </Text>
          </Stack>
        </XStack>
        <XStack gap="$md">
          <Stack bg="$neutral3" height={42}  rounded="$full" width={42} items="center" justify="center">
            <RoscaFill size={30} color="$surface1" />
          </Stack>
          <Stack width="83%">
            <Text variant="subHeading2">Join or create saving circles</Text>
            <Text variant="body3" color="$neutral2">
              Save in a circle and let your crew help you reach your goals. 
            </Text>
          </Stack>
        </XStack>
      </YStack>
      <Spacer height="10%"/>
      <YStack gap="$sm" width="85%" items="center">
        <Button variant="branded" size="lg" width="100%">Create a group</Button>
        <Button variant="branded" emphasis="secondary" size="lg" width="100%">Join a group</Button>
      </YStack>
    </View>
  );
}