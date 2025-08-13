import { TransactionItem } from "@/components/lists/TransactionItem";
import { getTokenById } from "@/features/wallet";
import { useEnabledTokens } from "@/features/wallet/hooks";
import { useGetAllTokenTxsQuery } from "@/features/wallet/transactions/blockscout";
import { getAllTokenTxs } from "@/features/wallet/transactions/transactions";
import { useWalletState } from "@/features/wallet/walletState";
import {
	Stack,
	Text,
	TouchableArea,
	TransactionLoader,
	XStack,
	YStack,
} from "@/ui";
import { NoTransactions } from "@/ui/components/icons";
import { router } from "expo-router";
import { memo, useMemo } from "react";
import { useAppState } from "../appState";

const MemoizedTransactionItem = memo(TransactionItem);

export const TransactionsCard = memo(() => {
	const tokens = useEnabledTokens();
	const mainAddress = useAppState((s) => s.user.mainAddress);
	const currency = useWalletState((s) => s.currency);
	const {
		data,
		error,
		isLoading: txLoading,
	} = useGetAllTokenTxsQuery({
		address: mainAddress,
		tokens: tokens,
		refetchOnMountOrArgChange: true,
	});

	// Memoize transactions to prevent recalculations
	const transactions = useMemo(
		() => getAllTokenTxs(data?.transactions, mainAddress),
		[data?.transactions, mainAddress],
	);

	// Memoize the first two transactions
	const displayedTransactions = useMemo(
		() => transactions.slice(0, 2),
		[transactions],
	);

	const isLoading = txLoading || !data;

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
			) : displayedTransactions.length ? (
				displayedTransactions.map((item) => {
					const token = getTokenById(item.tokenId);
					return item ? (
						<MemoizedTransactionItem
							key={`${item.id}_${item.tokenId}`}
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
							currency={currency}
						/>
					) : null;
				})
			) : (
				<NoTransactionsView />
			)}

			{!isLoading && transactions.length > 0 && <SeeAllButton />}
		</YStack>
	);
});

// Extracted components to prevent recreation on parent render
const NoTransactionsView = memo(() => (
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
			No transactions yet
		</Text>
	</XStack>
));

const SeeAllButton = memo(() => (
	<TouchableArea
		self="center"
		px="$3xl"
		hitSlop={8}
		pt="$2xs"
		onPress={() => router.navigate("/transfer/history")}
	>
		<Text variant="subHeading2" color="$neutral2">
			See all
		</Text>
	</TouchableArea>
));
