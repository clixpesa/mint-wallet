import { HeaderBackButton } from "@/components/Buttons/HeaderNavButtons";
import { useOnboardingContext } from "@/features/essentials";
import {
	AnimatedYStack,
	Button,
	Input,
	Spacer,
	SpinningLoader,
	Stack,
	Text,
	View,
	XStack,
	YStack,
} from "@/ui";
import { SetUsernameHeader } from "@/ui/assets";
import { router } from "expo-router";
import { useState } from "react";
import { Image } from "react-native";

export default function UsernameScreen() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [username, setUsername] = useState<string>();
	const { createClixtag, getSignedInUser, storeMnemonic } =
		useOnboardingContext();
	const handleUsername = async () => {
		setIsLoading(true);
		try {
			if (username && username?.length >= 3) {
				const tag = await createClixtag(username.trim().toLowerCase());
				//console.log(`${tag}.clix.eth`);
				const user = getSignedInUser();
				await storeMnemonic(user?.uid);
				setIsLoading(false);
				router.replace("/");
			}
		} catch (e) {
			console.warn(e);
		}
	};
	return (
		<View flex={1} bg="$surface1" items="center">
			<AnimatedYStack flex={1} grow={1} width="95%" items="center" gap="$xl">
				<XStack gap="$2xl" items="center" width="95%">
					<HeaderBackButton />
					<XStack gap="$sm" py="$xl" width="100%">
						<Stack bg="$tealThemed" height={6} width="15%" rounded="$2xl" />
						<Stack bg="$tealThemed" height={6} width="15%" rounded="$2xl" />
						<Stack bg="$tealThemed" height={6} width="15%" rounded="$2xl" />
						<Stack bg="$accent1" height={6} width="15%" rounded="$2xl" />
					</XStack>
				</XStack>
				<Image
					resizeMode="contain"
					source={SetUsernameHeader}
					style={{ width: "100%", height: "15%", opacity: 0.85 }}
				/>
				<YStack width="95%" items="center" gap="$md">
					<Text allowFontScaling={false} text="center" variant="subHeading1">
						Create your Username
					</Text>
					<Text color="$neutral2" text="center" width="85%">
						Personalize your account with a unique name. Your username will be
						linked to your account.
					</Text>
				</YStack>
				<XStack
					borderWidth={2}
					borderColor="$surface3"
					rounded="$vl"
					minW="90%"
					items="center"
					px="$md"
				>
					<Text fontSize="$lg" fontWeight="$md">
						@
					</Text>
					<Input
						fontSize="$lg"
						autoFocus
						px={1}
						py="$md"
						placeholder="username"
						height="auto"
						minW="75%"
						onChangeText={(text) => setUsername(text)}
					/>
				</XStack>
				{isLoading ? (
					<XStack gap="$md" items="center">
						<SpinningLoader size={28} />
						<Text>Checking ...</Text>
					</XStack>
				) : null}
			</AnimatedYStack>
			<Spacer />
			<Button
				variant="branded"
				size="lg"
				b="$4xl"
				minW="85%"
				loading={isLoading}
				onPress={handleUsername}
			>
				{isLoading ? "Checking..." : "Continue"}
			</Button>
		</View>
	);
}
