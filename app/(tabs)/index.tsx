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

export default function HomeScreen() {
	const [refreshing, setRefreshing] = useState(false);
	const user = useAppState((s) => s.user);
	const isTestnet = useAppState((s) => s.testnetEnabled);
	const { defaultChainId } = useEnabledChains();
	const { mainAccount } = useWalletContext();
	const publicClient = usePublicClient();
	const fetchBalances = useWalletState((s) => s.fetchBalances);

	const onRefresh = async () => {
		setRefreshing(true);
		try {
			// Refresh balances
			if (user.mainAddress) {
				await fetchBalances(user.mainAddress, defaultChainId, isTestnet);
			}
			// Force refetch of transactions by invalidating cache
			// This will be handled by the RTK Query cache invalidation
		} finally {
			setTimeout(() => setRefreshing(false), 1000);
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
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor="$neutral2"
					/>
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

					{/*<Button height="$3xl" onPress={handleTestFns}>
						Test func
					</Button>*/}
				</YStack>
			</ScrollView>
		</View>
	);
}
