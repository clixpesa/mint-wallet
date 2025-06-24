import { Screen } from "@/components/layout/Screen";
import { TokenItem } from "@/components/lists/TokenItem";
import { getRate } from "@/features/wallet";
import { useEnabledChains, useEnabledTokens } from "@/features/wallet/hooks";
import { useBalances } from "@/features/wallet/walletState";
import { Text, TouchableArea, YStack } from "@/ui";
import { QrCode } from "@/ui/components/icons";
import { router } from "expo-router";

//TODO: Add filters bases on supported chains

export default function AssetsScreen() {
	const { totalBalanceUSD, overdraft, currency } = useBalances();
	const tokens = useEnabledTokens();
	const { defaultChainId } = useEnabledChains();
	const { symbol, conversionRate } = getRate(currency);
	const balInCurreny = totalBalanceUSD * conversionRate;
	const balSplit = balInCurreny.toFixed(2).split(".");
	const defaultShilling = tokens.find(
		(item) => item.symbol.includes("SH") && item.chainId === defaultChainId,
	);
	const shillingsWithBal = tokens.filter(
		(token) => token.symbol.endsWith("SH") && token.balance > 0,
	);
	const defaultDollar = tokens.find(
		(item) => item.symbol.includes("USD") && item.chainId === defaultChainId,
	);
	const dollarsWithBal = tokens.filter(
		(token) => token.symbol.includes("USD") && token.balance > 0,
	);
	return (
		<Screen
			title="Your Assets"
			rightElement={{
				Icon: <QrCode size={24} color="$neutral2" />,
				onPress: () => router.navigate("/(transactions)/ramps/receive"),
			}}
		>
			<YStack gap="$xs" mt="$lg" width="92%" items="center">
				<Text
					variant="heading3"
					fontWeight="800"
					color="$neutral1"
					fontSize={28}
				>
					{`${symbol} ${balSplit[0]}`}
					<Text
						variant="heading3"
						fontWeight="800"
						color="$neutral3"
						fontSize={28}
					>
						.{balSplit[1]}
					</Text>
				</Text>
				<Text variant="subHeading2" color="$neutral2">
					≈ ${totalBalanceUSD.toFixed(2)}
				</Text>
				<Text variant="subHeading2" color="$blueBase">
					Availabe Overdraft: ${overdraft.toFixed(2)}
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
					{!shillingsWithBal.length ? (
						<TouchableArea onPress={() => {}}>
							<TokenItem
								tokenInfo={{
									name: defaultShilling.name,
									symbol: defaultShilling.symbol,
									logoUrl: defaultShilling.logo,
									chainId: defaultShilling.chainId,
								}}
								amount={{
									actual: defaultShilling.balance,
									inUSD: defaultShilling.balanceUSD,
								}}
							/>
						</TouchableArea>
					) : (
						shillingsWithBal.map((item) => {
							const tokenId = `${item.symbol}_${item.chainId}`;
							return (
								<TouchableArea key={tokenId} onPress={() => {}}>
									<TokenItem
										tokenInfo={{
											name: item.name,
											symbol: item.symbol,
											logoUrl: item.logo,
											chainId: item.chainId,
										}}
										amount={{
											actual: item.balance,
											inUSD: item.balanceUSD,
										}}
									/>
								</TouchableArea>
							);
						})
					)}
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
					{!dollarsWithBal.length ? (
						<TouchableArea onPress={() => {}}>
							<TokenItem
								tokenInfo={{
									name: defaultDollar.name,
									symbol: defaultDollar.symbol,
									logoUrl: defaultDollar.logo,
									chainId: defaultDollar.chainId,
								}}
								amount={{
									actual: defaultDollar.balance,
									inUSD: defaultDollar.balanceUSD,
								}}
							/>
						</TouchableArea>
					) : (
						dollarsWithBal.map((item) => {
							const tokenId = `${item.symbol}_${item.chainId}`;
							return (
								<TouchableArea key={tokenId} onPress={() => {}}>
									<TokenItem
										tokenInfo={{
											name: item.name,
											symbol: item.symbol,
											logoUrl: item.logo,
											chainId: item.chainId,
										}}
										amount={{
											actual: item.balance,
											inUSD: item.balanceUSD,
										}}
									/>
								</TouchableArea>
							);
						})
					)}
				</YStack>
			</YStack>
		</Screen>
	);
}
