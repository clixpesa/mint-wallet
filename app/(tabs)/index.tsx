import {
	HomeCard,
	HomeHeader,
	ProductsCard,
	TransactionsCard,
} from "@/features/essentials";
import { useAppState } from "@/features/essentials/appState";
import { useEnabledChains } from "@/features/wallet/hooks";
import { LinearGradient, ScrollView, View, YStack } from "@/ui";
import { useState } from "react";
import { RefreshControl } from "react-native";
import { useDispatch } from "react-redux";

export default function HomeScreen() {
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();
	const setIsUnlocked = useAppState((s) => s.setIsUnlocked);
	const enabledChainInfo = useEnabledChains();
	console.log(enabledChainInfo);

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 2000);
	};

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
				</YStack>
			</ScrollView>
		</View>
	);
}
