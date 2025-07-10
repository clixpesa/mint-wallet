import { HeaderBackButton } from "@/components/Buttons/HeaderNavButtons";
import { TransactionsCard } from "@/features/spaces/components/TransactionsCard";
import {
	Button,
	IconButton,
	LinearGradient,
	Stack,
	Text,
	TouchableArea,
	View,
	XStack,
	YStack,
} from "@/ui";
import { ReceiveAlt, SendAction, Settings } from "@/ui/components/icons";
import { router } from "expo-router";
import { useState } from "react";
import { Progress } from "tamagui";

export default function SpaceHome() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isTarget, setIsTarget] = useState<boolean>(false);
	const balance = 0;
	const transactions = [];
	return (
		<View flex={1} bg="$surface1" items="center">
			<LinearGradient
				width="100%"
				height="100%"
				colors={["$surface1", "$surface3"]}
				position="absolute"
			/>
			<YStack gap="$md" width="100%" items="center">
				<XStack
					height={265}
					bg="$blueLight"
					width="100%"
					justify="space-between"
					items="flex-end"
					px="$xl"
					py="$xl"
				>
					<Stack position="absolute" t="$lg" l="$lg">
						<HeaderBackButton />
					</Stack>
					<YStack gap="$md">
						<Text variant="subHeading1">My Saving Pot</Text>
						<YStack gap="$xs">
							<Text
								variant="heading3"
								fontWeight="800"
								color="$neutral1"
								fontSize={30}
							>
								Ksh 0
								<Text
									variant="heading3"
									fontWeight="800"
									color="$neutral3"
									fontSize={30}
								>
									.00
								</Text>
							</Text>
							<XStack items="center" gap="$2xs">
								<Text variant="subHeading2" color="$neutral2">
									≈ $0.00
								</Text>
								<TouchableArea
									bg="$tealThemed"
									rounded="$full"
									py="$4xs"
									px="$sm"
									onPress={() => {}}
								>
									<Text variant="subHeading2" color="$neutral1">
										+0.00
									</Text>
								</TouchableArea>
							</XStack>
						</YStack>
					</YStack>
					<IconButton
						icon={<Settings size={24} color="$accent1" />}
						size="md"
						variant="branded"
						emphasis="secondary"
					/>
				</XStack>
				<YStack
					gap="$sm"
					width="92%"
					px="$sm"
					pt="$md"
					pb="$xl"
					rounded="$lg"
					bg="$surface1"
				>
					<XStack justify="space-between">
						<Text fontWeight="$md">Saved $0</Text>
						<Text>Target: $2500</Text>
					</XStack>
					<Progress value={0} height="$xs" bg="$tealThemed">
						<Progress.Indicator bg="$tealBase" animation="80ms-ease-in-out" />
					</Progress>
					<Text>
						8 June 2025 <Text color="$neutral2">- 1 month to go</Text>
					</Text>
				</YStack>
				<TransactionsCard transactions={transactions} isLoading={isLoading} />
			</YStack>
			<XStack justify="space-between" position="absolute" b="$3xl" width="92%">
				<Button
					variant="branded"
					emphasis={balance > 0 ? "secondary" : "primary"}
					size="lg"
					width={balance > 0 ? (isTarget ? "25%" : "48%") : "72%"}
					icon={<SendAction size={24} />}
					onPress={() =>
						router.navigate({
							pathname: "/(spaces)/add-cash",
							params: {
								address: "0x590392F06AC76c82F49C01219CF121A553Aa2e58",
								name: "My Saving Port",
								id: 1,
							},
						})
					}
				>
					{isTarget ? null : "Add Cash"}
				</Button>
				<Button
					variant="branded"
					emphasis={isTarget ? "primary" : "secondary"}
					size="lg"
					width={balance > 0 ? (isTarget ? "72%" : "48%") : "25%"}
					icon={<ReceiveAlt size={24} />}
				>
					{balance > 0 ? "Cash Out" : null}
				</Button>
			</XStack>
		</View>
	);
}
