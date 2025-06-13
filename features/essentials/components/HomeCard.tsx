import { Stack, Text, TouchableArea, XStack, YStack } from "@/ui";
import { Currency, RotatableChevron } from "@/ui/components/icons";
import { router } from "expo-router";
import { HomeActions } from "./HomeActions";

export const HomeCard = () => {
	const totalBalUSD = 1000;
	return (
		<YStack width="92%" mt="$sm">
			<XStack justify="space-between">
				<YStack gap="$2xs">
					<Text color="$neutral2">Your Balance </Text>
					<Text variant="heading2" fontWeight="800" color="$neutral1">
						Ksh 999,999
						<Text variant="heading2" fontWeight="800" color="$neutral3">
							.99
						</Text>
					</Text>
					<XStack items="center" gap="$2xs">
						<Text variant="subHeading2" color="$neutral2">
							≈ $7,740.70
						</Text>
						<TouchableArea bg="$bluePastel" rounded="$full" py="$4xs" px="$sm">
							<Text variant="subHeading2" color="$neutral1">
								+1,000
							</Text>
						</TouchableArea>
					</XStack>
				</YStack>
				<TouchableArea
					onPress={() => {
						router.push("/(essentials)/tokens/overview");
					}}
				>
					<YStack
						items="center"
						bg="$accent2Solid"
						borderEndEndRadius={16}
						borderRightWidth={2}
						borderColor="$surface3"
					>
						<RotatableChevron direction="right" color="$accent1" />
						<Stack width="$4xl" items="center" py="$sm" overflow="hidden">
							<Currency
								size={54}
								rotate="-30deg"
								color="$accent1"
								opacity={0.9}
							/>
						</Stack>
					</YStack>
				</TouchableArea>
			</XStack>
			<HomeActions />
		</YStack>
	);
};
