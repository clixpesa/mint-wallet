import { TransactionItem } from "@/components/lists/TransactionItem";
import { getTokenById } from "@/features/wallet";
import { useEnabledTokens } from "@/features/wallet/hooks";
import { useGetAllTokenTxsQuery } from "@/features/wallet/transactions/blockscout";
import { getAllTokenTxs } from "@/features/wallet/transactions/transactions";
import {
	Stack,
	Text,
	TouchableArea,
	TransactionLoader,
	XStack,
	YStack,
} from "@/ui";
import { NoTransactions } from "@/ui/components/icons";
import { useState } from "react";
import { useAppState } from "../appState";

export const TransactionsCard = () => {
	const tokens = useEnabledTokens();
	const user = useAppState((s) => s.user);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const {
		data,
		error,
		isLoading: txLoading,
	} = useGetAllTokenTxsQuery({
		address: user.mainAddress,
		tokens: tokens,
	});
	const transactions = getAllTokenTxs(data?.transactions, user.mainAddress);

	return (
		<YStack
			bg="$surface1"
			width="100%"
			px="$md"
			py={isLoading || txLoading || !data ? "$2xs" : "$md"}
			mt={transactions.length > 0 ? "$md" : "$3xl"}
			rounded="$lg"
			gap="$md"
		>
			{isLoading || txLoading || !data ? (
				<TransactionLoader opacity={1} withAmounts />
			) : transactions.length ? (
				transactions.slice(0, 2).map((item) => {
					const token = getTokenById(item.tokenId);
					return item ? (
						<TransactionItem
							key={item?.id}
							txInfo={{
								title: item.title,
								date: item.date,
							}}
							tokenInfo={{
								name: token.name,
								symbol: token.symbol,
								logoUrl: token.logo,
								chainId: token.chainId,
							}}
							amount={{
								actual: item.amount,
								inUSD: item.amountUSD,
							}}
						/>
					) : null;
				})
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
			{!isLoading && !txLoading && transactions.length > 0 && (
				<TouchableArea self="center" px="$3xl" hitSlop={8} pt="$2xs">
					<Text variant="subHeading2" color="$neutral2">
						See all
					</Text>
				</TouchableArea>
			)}
		</YStack>
	);
};
