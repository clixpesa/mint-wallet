import { Screen } from "@/components/layout/Screen";
import { TokenItem } from "@/components/lists/TokenItem";
import { Text, YStack } from "@/ui";
import { ScanQr } from "@/ui/components/icons";

//TODO: Add filters bases on supported chains

export default function AssetsScreen() {
	return (
		<Screen
			title="Your Assets"
			rightElement={{
				Icon: <ScanQr size={30} color="$neutral3" />,
				onPress: () => {},
			}}
		>
			<YStack gap="$xs" mt="$lg" width="92%" items="center">
				<Text
					variant="heading3"
					fontWeight="800"
					color="$neutral1"
					fontSize={28}
				>
					Ksh 999,999
					<Text
						variant="heading3"
						fontWeight="800"
						color="$neutral3"
						fontSize={28}
					>
						.99
					</Text>
				</Text>
				<Text variant="subHeading2" color="$neutral2">
					≈ $7,740.70
				</Text>
				<Text variant="subHeading2" color="$blueBase">
					Availabe Overdraft: $100.00
				</Text>
			</YStack>
			<YStack gap="$sm" mt="$lg" width="92%">
				<YStack
					bg="$surface1"
					width="100%"
					px="$sm"
					pt="$md"
					pb="$xl"
					rounded="$lg"
					gap="$md"
				>
					<Text color="$neutral2" pl="$xs">
						Shillings
					</Text>
					<TokenItem
						tokenInfo={{
							name: "KES Lira",
							symbol: "KELI",
							logoUrl: require("@/ui/assets/images/token-logos/keli-logo.png"),
							chainId: 43114,
						}}
						amount={{
							actual: 10,
							inUSD: 0.077,
						}}
					/>
				</YStack>
				<YStack
					bg="$surface1"
					width="100%"
					px="$sm"
					pt="$md"
					pb="$xl"
					rounded="$lg"
					gap="$md"
				>
					<Text color="$neutral2" pl="$xs">
						Dollars
					</Text>
					<TokenItem
						tokenInfo={{
							name: "USD Coin",
							symbol: "USDC",
							logoUrl: require("@/ui/assets/images/token-logos/usdc-logo.png"),
							chainId: 43114,
						}}
						amount={{
							actual: 0.005,
							inUSD: 0.005,
						}}
					/>
					<TokenItem
						tokenInfo={{
							name: "Tether USD",
							symbol: "USDT",
							logoUrl: require("@/ui/assets/images/token-logos/tether-logo.png"),
							chainId: 43114,
						}}
						amount={{
							actual: 0.0,
							inUSD: 0.0,
						}}
					/>
				</YStack>
			</YStack>
		</Screen>
	);
}
