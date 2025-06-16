import { HeaderBackButton } from "@/components/Buttons/HeaderNavButtons";
import { AccountIcon } from "@/components/account/AccountIcon";
import { Text, TouchableArea, View, XStack, YStack } from "@/ui";
import { useLocalSearchParams } from "expo-router";

type HeaderParams = {
	address: Address;
	name: string;
	phone: string;
};

export default function SendScreen() {
	const params: HeaderParams = useLocalSearchParams();
	return (
		<View flex={1} items="center" bg="$surface1">
			<Header
				address={params.address}
				name={params.name}
				phone={params.phone}
			/>
			<Text>Add Cash</Text>
			<Text color="$neutral2">Use Card, MPesa or Bank</Text>
		</View>
	);
}

const Header = ({ address, name, phone }: HeaderParams) => {
	return (
		<XStack
			width="100%"
			items="center"
			py="$xs"
			px="$sm"
			justify="space-between"
		>
			<HeaderBackButton />
			<YStack items="center" gap="$2xs">
				<Text variant="subHeading1" fontWeight="$md" color="$neutral1">
					{name}
				</Text>
				<Text variant="body3" color="$neutral2">
					{phone}
				</Text>
			</YStack>
			<TouchableArea rounded="$full" px="$sm">
				<AccountIcon size={36} address={address} />
			</TouchableArea>
		</XStack>
	);
};
