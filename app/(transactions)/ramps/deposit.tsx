import { HeaderBackButton } from "@/components/Buttons/HeaderNavButtons";
import { Text, TouchableArea, View, XStack } from "@/ui";
import { BarchartLine, ScanHome } from "@/ui/components/icons";

export default function DepositScreen() {
  return (  
    <View flex={1} items="center" bg="$surface1" >
      <Header />
      <Text>Add Cash</Text>
      <Text color="$neutral2">Use Card, MPesa or Bank</Text>
    </View>
  );
}

const Header = () => {
  return (
    <XStack width="100%" items="center" py="$sm" px="$sm" justify="space-between" >
      <XStack gap="$sm" items="center" >
        <HeaderBackButton />
        <Text variant="subHeading1" fontWeight="$md" color="$neutral1">Add Money</Text>
        </XStack>
      <XStack gap="$sm" px="$sm" items="center">
        <TouchableArea rounded="$full" >
          <ScanHome color="$neutral3" size={34}/>
        </TouchableArea>
        <TouchableArea rounded="$full" >
          <BarchartLine color="$neutral3" size={32}/>
        </TouchableArea>
      </XStack>
    </XStack>
  )
} 