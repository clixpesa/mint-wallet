import { addMember } from "@/features/contracts/roscas";
import {
	HomeCard,
	HomeHeader,
	ProductsCard,
	TransactionsCard,
	type TransactionsCardRef,
} from "@/features/essentials";
import { useAppState } from "@/features/essentials/appState";
import { usePublicClient, useWalletContext } from "@/features/wallet";
import { useEnabledChains } from "@/features/wallet/hooks";
import { useWalletState } from "@/features/wallet/walletState";
import { LinearGradient, ScrollView, View, YStack } from "@/ui";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshControl } from "react-native";
//import { Button } from "tamagui";

export default function HomeScreen() {
	const [refreshing, setRefreshing] = useState(false);
	const user = useAppState((s) => s.user);
	const isTestnet = useAppState((s) => s.testnetEnabled);
	const { defaultChainId } = useEnabledChains();
	const { mainAccount } = useWalletContext();
	const publicClient = usePublicClient();
	const fetchBalances = useWalletState((s) => s.fetchBalances);
	const transactionsRef = useRef<TransactionsCardRef>(null);

	// Refetch transactions when screen comes into focus
	useFocusEffect(
		useCallback(() => {
			// Only refetch if we have cached data (avoid unnecessary loading on first visit)
			if (transactionsRef.current) {
				transactionsRef.current.refetch();
			}
		}, []),
	);

	const onRefresh = async () => {
		setRefreshing(true);
		try {
			// Refresh balances
			if (user.mainAddress) {
				await fetchBalances(user.mainAddress, defaultChainId, isTestnet);
			}
			// Refetch transactions
			if (transactionsRef.current) {
				transactionsRef.current.refetch();
			}
		} finally {
			setTimeout(() => setRefreshing(false), 1000);
		}
	};

	const handleTestFns = async () => {
		try {
			const result = await addMember({
				chainId: defaultChainId,
				spaceId: "0x5b57060281879327",
				account: mainAccount,
				member: "0x0afE217fa650FD5355DB1088c23B06edDD03745F",
			});
			console.log(result);
		} catch (e) {
			console.log(e);
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
					<TransactionsCard ref={transactionsRef} />
					<ProductsCard />

					{/*<Button height="$3xl" onPress={handleTestFns}>
						Test func
					</Button>*/}
				</YStack>
			</ScrollView>
		</View>
	);
}
