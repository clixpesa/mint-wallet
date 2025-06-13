import { Screen } from "@/components/layout/Screen";
import { TokenLogo } from "@/components/logos/TokenLogo";
import { Text, XStack, YStack } from "@/ui";
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
					<XStack items="center" justify="space-between">
						<XStack gap="$sm">
							<TokenLogo
								chainId={43114}
								symbol="KELI"
								url="https://assets.coingecko.com/coins/images/38958/standard/MENTO_TOKEN_icon_200.png"
								//hideNetworkLogo={true} hide logo when zero balance
							/>
							<YStack gap="$2xs">
								<Text variant="subHeading2">KELI</Text>
								<Text variant="body3" color="$neutral2">
									KES Lira
								</Text>
							</YStack>
						</XStack>
						<YStack px="$2xs" gap="$2xs">
							<Text variant="subHeading2" text="right">
								0.00
							</Text>
							<Text variant="body3" color="$neutral2" text="right">
								~ $0.00
							</Text>
						</YStack>
					</XStack>
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
					<XStack items="center" justify="space-between">
						<XStack gap="$sm">
							<TokenLogo
								chainId={43114}
								symbol="USDC"
								url={require("@/ui/assets/images/token-logos/usdc-logo.png")}
							/>
							<YStack width="58%" gap="$2xs">
								<Text variant="subHeading2">USDC</Text>
								<Text variant="body3" color="$neutral2">
									USD Coin
								</Text>
							</YStack>
						</XStack>
						<YStack px="$2xs" gap="$2xs">
							<Text variant="subHeading2" text="right">
								0.00
							</Text>
							<Text variant="body3" color="$neutral2" text="right">
								~ $0.00
							</Text>
						</YStack>
					</XStack>
					<XStack items="center" justify="space-between">
						<XStack gap="$sm">
							<TokenLogo
								chainId={43114}
								symbol="KELI"
								url={require("@/ui/assets/images/token-logos/tether-logo.png")}
							/>
							<YStack width="58%" gap="$2xs">
								<Text variant="subHeading2">USDT</Text>
								<Text variant="body3" color="$neutral2">
									Tether USD
								</Text>
							</YStack>
						</XStack>
						<YStack px="$2xs" gap="$2xs">
							<Text variant="subHeading2" text="right">
								0.00
							</Text>
							<Text variant="body3" color="$neutral2" text="right">
								~ $0.00
							</Text>
						</YStack>
					</XStack>
				</YStack>
			</YStack>
		</Screen>
	);
}
