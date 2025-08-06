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
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "tamagui";
import { createPublicClient, http, parseAbiItem } from "viem";
import { celo } from "viem/chains";

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
	console.log(dataX);

	const handleTestFns = async () => {
		try {
			resetX();
			onrampWithXwift({
				amount: 100,
				phone: "+254769166181",
				tokenId: "cUSD_CELO",
				address: "0xDE0B552766A0B93B0c405f56c6D0999b9916790A",
			});

			const publicClient = createPublicClient({
				chain: celo,
				transport: http(
					"https://42220.rpc.thirdweb.com/c9f58f940343e75c35e9e07f93acc785",
				),
			});
			const unwatch = publicClient?.watchEvent({
				address: ["0x765DE816845861e75A25fCA122bb6898B8B1282a"],
				event: parseAbiItem(
					"event Transfer(address indexed from, address indexed to, uint256 value)",
				),
				args: {
					to: "0xDE0B552766A0B93B0c405f56c6D0999b9916790A",
				},
				onLogs: (logs) => {
					console.log(logs[0].transactionHash);
					unwatch();
				},
			});
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
