
import { AccountIcon } from "@/components/account/AccountIcon";
import { Text, TouchableArea, XStack } from "@/ui";
import { BarchartLine, Bell, Earth, PlusCircle, ScanHome, Search } from "@/ui/components/icons";

export const HomeHeader = () => {
  return (
    <XStack width="100%" items="center" py="$xs" px="$sm" justify="space-between">
      <XStack gap="$sm" items="center">
        <TouchableArea >
          <AccountIcon address="0x765DE816845861e75A25fCA122bb6898B8B1282a" size={40} />		
        </TouchableArea>
        <Text variant="subHeading1" fontWeight="$md" fontSize="$lg"  color="$neutral1">Home</Text>
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

export const ExtrasHeader = () => {
  return (
    <XStack width="100%" items="center" py="$xs" px="$sm" justify="space-between">
      <XStack gap="$sm" items="center">
        <TouchableArea >
          <AccountIcon address="0x765DE816845861e75A25fCA122bb6898B8123456" size={40} />		
        </TouchableArea>
        <Text variant="subHeading1" fontWeight="$md" fontSize="$lg" color="$neutral1">Extras</Text>
        </XStack>
      <XStack gap="$sm" px="$sm" items="center">
        <TouchableArea rounded="$full" >
          <ScanHome color="$neutral3" size={34}/>
        </TouchableArea>
        <TouchableArea rounded="$full" >
          <Search color="$neutral3" size={28}/>
        </TouchableArea>
      </XStack>
    </XStack>
  )
}

export const SpacesHeader = () => {
  return (
    <XStack width="100%" items="center" py="$xs" px="$sm" justify="space-between">
      <XStack gap="$sm" items="center">
        <TouchableArea >
          <AccountIcon address="0x765DE816845861e75A25fCA122bb6898B8123456" size={40} />		
        </TouchableArea>
        <Text variant="subHeading1" fontWeight="$md" fontSize="$lg" color="$neutral1">Spaces</Text>
        </XStack>
      <XStack gap="$sm" px="$sm" items="center">
        <TouchableArea rounded="$full" >
          <Bell color="$neutral3" size={30}/>
        </TouchableArea>
        <TouchableArea rounded="$full" >
          <PlusCircle color="$neutral3" size={32}/>
        </TouchableArea>
      </XStack>
    </XStack>
  )
}

export const InvestHeader = () => {
  return (
    <XStack width="100%" items="center" py="$xs" px="$sm" justify="space-between">
      <XStack gap="$sm" items="center">
        <TouchableArea >
          <AccountIcon address="0x765DE816845861e75A25fCA122bb6898B8123456" size={40} />		
        </TouchableArea>
        <Text variant="subHeading1" fontWeight="$md" fontSize="$lg" color="$neutral1">Invest</Text>
        </XStack>
      <XStack gap="$sm" px="$sm" items="center">
        <TouchableArea rounded="$full" >
          <BarchartLine color="$neutral3" size={30}/>
        </TouchableArea>
        <TouchableArea rounded="$full" >
          <Earth color="$neutral3" size={32}/>
        </TouchableArea>
      </XStack>
    </XStack>
  )
}