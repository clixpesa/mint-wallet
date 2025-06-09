import { Text, YStack } from "@/ui"
import { SpaceActions } from "./SpaceActions"

export const SpacesCard = ({index}: {index: number}) => {
  const totalBalUSD = 1000
  const titles = ["Savings Goals/Challenges", "Groups", "Collections"]
  return (
    <YStack width="92%" mt="$sm">
      <YStack gap="$2xs">
        <Text color="$neutral2">{`Popular ${titles[index]}`}</Text>
        <Text variant="heading2" fontWeight="800" color="$neutral1">
          Ksh 999,999
          <Text variant="heading2" fontWeight="800" color="$neutral3">
            .99
          </Text>
        </Text> 
        <Text variant="subHeading2" color="$neutral2">
          ≈ $7,740.70
        </Text>
      </YStack>
      <SpaceActions />
    </YStack>
  )
}