import {
	HomeCard,
	HomeHeader,
	ProductsCard,
	TransactionsCard,
} from "@/features/essentials";
import { useAppState } from "@/features/essentials/appState";
import { usePublicClient, useWalletContext } from "@/features/wallet";
import { useEnabledChains } from "@/features/wallet/hooks";
import { useWalletState } from "@/features/wallet/walletState";
import { LinearGradient, ScrollView, View, YStack } from "@/ui";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { Button } from "tamagui";
import { decodeEventLog } from "viem";

export default function HomeScreen() {
	const [refreshing, setRefreshing] = useState(false);
	const user = useAppState((s) => s.user);
	const isTestnet = useAppState((s) => s.testnetEnabled);
	const { defaultChainId } = useEnabledChains();
	const { mainAccount } = useWalletContext();
	const publicClient = usePublicClient();
	const fetchBalances = useWalletState((s) => s.fetchBalances);

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 2000);
	};

	const handleTestFns = async () => {
		try {
			const transferEventAbi = {
				type: "event",
				name: "Transfer",
				inputs: [
					{ name: "from", type: "address", indexed: true },
					{ name: "to", type: "address", indexed: true },
					{ name: "value", type: "uint256", indexed: false },
				],
			} as const;
			const txHashs = [
				"0xc685f39b21d67b31a598f084d563bdc0969d4da75b432128490bde74114dc50b",
				"0x1abd0f8300b4e86d8c10b87c7a2ecc091b26370bc2a90e843ece85424caab21e",
			];
			const txs = [];
			for (const txHash of txHashs) {
				const tx = await publicClient?.getTransactionReceipt({
					hash: txHash,
				});
				const block = await publicClient?.getBlock({
					blockNumber: tx?.blockNumber,
				});
				const transfers = tx.logs
					.map((log) => {
						try {
							const decoded = decodeEventLog({
								abi: [transferEventAbi],
								data: log.data,
								topics: log.topics,
							});
							const aTx = decoded.args
								? {
										...decoded.args,
										token: log.address,
										date: new Date(
											Number(block?.timestamp) * 1000,
										).toLocaleDateString("en-US", {
											weekday: "short",
											day: "numeric",
											month: "short",
											year: "numeric",
										}),
									}
								: null;
							return aTx;
						} catch (e) {
							return null; // Not a Transfer event
						}
					})
					.filter(Boolean); // Remove nulls
				txs.push(...transfers);
			}
			console.log(txs);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user.mainAddress)
			fetchBalances(user.mainAddress, defaultChainId, isTestnet);
	}, [user, fetchBalances, defaultChainId, isTestnet]);

	return (
		<View flex={1} items="center" bg="$surface1">
			<LinearGradient
				width="100%"
				height="100%"
				colors={["$surface1", "$surface3"]}
				position="absolute"
			/>

			<HomeHeader />
			<ScrollView
				width="100%"
				grow={1}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					items: "center",
					pb: "$3xl",
				}}
			>
				<HomeCard />
				<YStack gap="$sm" width="92%">
					<TransactionsCard />
					<ProductsCard />

					<Button height="$3xl" onPress={handleTestFns}>
						Test func
					</Button>
				</YStack>
			</ScrollView>
		</View>
	);
}
