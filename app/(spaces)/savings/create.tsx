import { HeaderBackButton } from "@/components/Buttons/HeaderNavButtons";
import {
	Button,
	IconButton,
	Spacer,
	Stack,
	Text,
	TextInput,
	View,
	XStack,
	YStack,
} from "@/ui";
import { Gallery } from "@/ui/components/icons";
import { router } from "expo-router";
import { useState } from "react";
import { Button as Chip } from "tamagui";

export default function Create() {
	const [name, setName] = useState("");
	const [showButton, setShowButton] = useState<boolean>(true);

	const spaceNames = [
		"Holidays",
		"Savings",
		"Gift",
		"Rainy day",
		"Education",
		"Renovation",
	];

	return (
		<View flex={1} bg="$surface1" items="center">
			<YStack gap="$md" width="100%">
				<XStack
					height={240}
					bg="$blueLight"
					width="100%"
					justify="space-between"
					items="flex-end"
					px="$2xl"
					py="$xl"
				>
					<Stack position="absolute" t="$lg" l="$lg">
						<HeaderBackButton />
					</Stack>
					<Text variant="subHeading1">Create a New Space</Text>
					<IconButton
						icon={<Gallery size={24} color="$neutral2" />}
						size="md"
						variant="branded"
						emphasis="secondary"
					/>
				</XStack>
				<TextInput
					placeholder="space name"
					width="92%"
					self="center"
					fontSize="$lg"
					autoFocus
					value={name}
					onFocus={() => setShowButton(false)}
					onBlur={() => setShowButton(true)}
					onChangeText={(text) => setName(text)}
				/>
				<View
					flexDirection="row"
					flexWrap="wrap"
					gap="$xs"
					mt="$md"
					justify="center"
				>
					{spaceNames.map((name) => (
						<Chip
							bg="$tealThemed"
							key={name}
							size="$sm"
							height="$3xl"
							onPress={() => setName(name)}
						>
							{name}
						</Chip>
					))}
				</View>
			</YStack>
			<Spacer />
			{showButton && (
				<Button
					variant="branded"
					size="lg"
					minW="85%"
					position="absolute"
					b="$4xl"
					onPress={() =>
						router.navigate({
							pathname: "/(spaces)/savings/set-goal",
							params: {
								name,
							},
						})
					}
				>
					Continue
				</Button>
			)}
		</View>
	);
}
