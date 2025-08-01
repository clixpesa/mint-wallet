import { AccountIcon } from "@/components/account/AccountIcon";
import { useAppState } from "@/features/essentials/appState";
import { Text, TouchableArea, XStack } from "@/ui";
import { Bell, PlusCircle } from "@/ui/components/icons";
import { router } from "expo-router";

export const SpacesHeader = (index: number) => {
	const user = useAppState((s) => s.user);
	return (
		<XStack
			width="100%"
			items="center"
			py="$xs"
			px="$sm"
			justify="space-between"
		>
			<XStack gap="$sm" items="center">
				<TouchableArea onPress={() => router.navigate("/(tabs)/account")}>
					<AccountIcon
						address={
							user.mainAddress
								? user.mainAddress
								: "0x765DE816845861e75A25fCA122bb6898B8B1282a"
						}
						size={40}
					/>
				</TouchableArea>
				<Text
					variant="subHeading1"
					fontWeight="$md"
					fontSize="$lg"
					color="$neutral1"
				>
					Spaces
				</Text>
			</XStack>
			<XStack gap="$sm" px="$sm" items="center">
				<TouchableArea rounded="$full">
					<Bell color="$neutral3" size={30} />
				</TouchableArea>
				<TouchableArea
					rounded="$full"
					onPress={() => {
						index.index === 0
							? router.navigate("/(spaces)/savings/create")
							: router.navigate("/(spaces)/roscas/create");
					}}
				>
					<PlusCircle color="$neutral3" size={32} />
				</TouchableArea>
			</XStack>
		</XStack>
	);
};
