import { AccountIcon } from "@/components/account/AccountIcon";
import { Text, TouchableArea, XStack } from "@/ui";
import { BarchartLine, ScanHome } from "@/ui/components/icons";
import { getAuth } from "@react-native-firebase/auth";

export const HomeHeader = () => {
	const getUser = async () => {
		const currentUser = getAuth().currentUser;

		console.log(await currentUser?.getIdTokenResult());
	};
	return (
		<XStack
			width="100%"
			items="center"
			py="$xs"
			px="$sm"
			justify="space-between"
		>
			<XStack gap="$sm" items="center">
				<TouchableArea onPress={getUser}>
					<AccountIcon
						address="0x765DE816845861e75A25fCA122bb6898B8B1282a"
						size={40}
					/>
				</TouchableArea>
				<Text
					variant="subHeading1"
					fontWeight="$md"
					fontSize="$lg"
					color="$neutral1"
				>
					Home
				</Text>
			</XStack>
			<XStack gap="$sm" px="$sm" items="center">
				<TouchableArea rounded="$full">
					<ScanHome color="$neutral3" size={34} />
				</TouchableArea>
				<TouchableArea rounded="$full">
					<BarchartLine color="$neutral3" size={32} />
				</TouchableArea>
			</XStack>
		</XStack>
	);
};
