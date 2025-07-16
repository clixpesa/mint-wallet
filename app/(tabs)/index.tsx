import { getUserRoscas } from "@/features/contracts/roscas";
import {
	HomeCard,
	HomeHeader,
	ProductsCard,
	TransactionsCard,
} from "@/features/essentials";
import { useAppState } from "@/features/essentials/appState";
import { useWalletContext } from "@/features/wallet";
import { useEnabledChains } from "@/features/wallet/hooks";
import { useWalletState } from "@/features/wallet/walletState";
import { LinearGradient, ScrollView, View, YStack } from "@/ui";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "tamagui";
import type { Address } from "viem";

export default function HomeScreen() {
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();
	const user = useAppState((s) => s.user);
	const { defaultChainId } = useEnabledChains();
	const { mainAccount, publicClient } = useWalletContext();
	const fetchBalances = useWalletState((s) => s.fetchBalances);

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 2000);
	};

	const handleTestFns = async () => {
		try {
			const reciept = await getUserRoscas({
				chainId: defaultChainId,
				address: user.mainAddress as Address,
			});
			console.log(reciept);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user.mainAddress) fetchBalances(user.mainAddress, defaultChainId);
	}, [user, fetchBalances, defaultChainId]);

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
