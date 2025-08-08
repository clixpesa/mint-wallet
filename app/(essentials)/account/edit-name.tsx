import { Screen } from "@/components/layout/Screen";
import { Button, Spacer, Text, TextInput, YStack } from "@/ui";
import { getAuth } from "@react-native-firebase/auth";
import { router } from "expo-router";
import { useState } from "react";

export default function EditName() {
	const [name, setName] = useState<string>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const user = getAuth().currentUser;
	const updateName = async () => {
		setIsLoading(true);
		await user?.updateProfile({
			displayName: name,
		});
		setIsLoading(false);
		router.back();
	};
	return (
		<Screen title="Name">
			<YStack width="92%" gap="$sm" mt="$3xl">
				<TextInput
					value={name}
					placeholder="name"
					autoFocus
					onChangeText={(text) => setName(text)}
				/>
				<Text variant="body4" color="$neutral2" text="center">
					People will see this name when you intract in groups and send transact
				</Text>
			</YStack>
			<Spacer />
			<Button
				position="absolute"
				b="$3xl"
				width="85%"
				loading={isLoading}
				variant="branded"
				onPress={() => updateName()}
			>
				Save
			</Button>
		</Screen>
	);
}
