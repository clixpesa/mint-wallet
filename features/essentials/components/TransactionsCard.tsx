import { TransactionItem } from "@/components/lists/TransactionItem";
import {
	Stack,
	Text,
	TouchableArea,
	TransactionLoader,
	XStack,
	YStack,
} from "@/ui";
import { NoTransactions } from "@/ui/components/icons";
import { useEffect, useState } from "react";

export const TransactionsCard = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const transactions = [{ key: "0x0001" }, { key: "0x0002" }];
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);
	return (
		<YStack
			bg="$surface1"
			width="100%"
			px="$md"
			py={isLoading ? "$2xs" : "$md"}
			mt={transactions.length > 0 ? "$md" : "$3xl"}
			rounded="$lg"
			gap="$md"
		>
			{isLoading ? (
				<TransactionLoader opacity={1} withAmounts />
			) : transactions.length > 0 ? (
				transactions.map((item) => (
					<TransactionItem
						key={item.key}
						txInfo={{
							title: "Recieved KELI",
							date: "Sun, 15 Jun 2025",
						}}
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
				))
			) : (
				<XStack items="center" gap="$sm">
					<Stack
						bg="$neutral3"
						height={48}
						rounded="$full"
						width={48}
						items="center"
						justify="center"
					>
						<NoTransactions size={32} color="$surface1" />
					</Stack>
					<Text variant="subHeading1" color="$neutral2">
						{" "}
						No transactions yet
					</Text>
				</XStack>
			)}
			{!isLoading && transactions.length > 0 && (
				<TouchableArea self="center" px="$3xl" hitSlop={8} pt="$2xs">
					<Text variant="subHeading2" color="$neutral2">
						See all
					</Text>
				</TouchableArea>
			)}
		</YStack>
	);
};
