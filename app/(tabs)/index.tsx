//import { Button } from "tamagui";
import {
	HomeCard,
	HomeHeader,
	ProductsCard,
	TransactionsCard,
} from "@/features/essentials";
import { useAppState } from "@/features/essentials/appState";
import { useWalletContext } from "@/features/wallet";
import { useEnabledChains } from "@/features/wallet/hooks";
import {
	useOnrampPMutation,
	useOnrampXMutation,
} from "@/features/wallet/transactions/ramps";
import { useWalletState } from "@/features/wallet/walletState";
import { LinearGradient, ScrollView, View, YStack } from "@/ui";
import { getAuth, getIdTokenResult } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "tamagui";

export default function HomeScreen() {
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();
	const user = useAppState((s) => s.user);
	const isTestnet = useAppState((s) => s.testnetEnabled);
	const recentRecipients = useAppState((s) => s.recentRecipients);
	const setRecipients = useAppState((s) => s.setRecentRecipient);
	const { defaultChainId } = useEnabledChains();
	const { mainAccount } = useWalletContext();
	//const publicClient = usePublicClient();
	const fetchBalances = useWalletState((s) => s.fetchBalances);
	const [onrampWithPayd, { reset: resetP, data: dataP }] = useOnrampPMutation();
	const [onrampWithXwift, { reset: resetX, data: dataX }] =
		useOnrampXMutation();

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 2000);
	};

	const handleTestFns = async () => {
		try {
			const user = await getAuth().currentUser;
			const tokenResult = await getIdTokenResult(user);
			console.log(tokenResult);
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
