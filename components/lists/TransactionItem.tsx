import { type ChainId, Currency, getRate } from "@/features/wallet";
import { Text, TouchableArea, XStack, YStack } from "@/ui";
import { TokenLogo } from "../logos/TokenLogo";

export type TxItemParams = {
	tokenInfo: {
		name: string;
		symbol: string;
		logoUrl: string;
		chainId: ChainId;
	};
	amount: {
		actual: number;
		inUSD: number;
	};
	txInfo: {
		title: string;
		date: string;
		credited?: boolean;
	};
	hideNetworkLogo?: boolean;
};

export function TransactionItem({
	txInfo,
	tokenInfo,
	amount,
	hideNetworkLogo,
}: TxItemParams): JSX.Element {
	const rate = getRate(Currency.KES);
	const eqvAmount = rate?.conversionRate
		? amount.inUSD * rate.conversionRate
		: 0;
	return (
		<TouchableArea onPress={() => console.log(tokenInfo)}>
			<XStack items="center" justify="space-between" my="$2xs">
				<XStack gap="$sm">
					<TokenLogo
						chainId={tokenInfo.chainId}
						symbol={tokenInfo.symbol}
						url={tokenInfo.logoUrl}
						hideNetworkLogo={hideNetworkLogo}
					/>
					<YStack width="58%" gap="$2xs">
						<Text variant="subHeading2">{txInfo.title}</Text>
						<Text variant="body3" color="$neutral2">
							{txInfo.date}
						</Text>
					</YStack>
				</XStack>
				<YStack px="$2xs" gap="$2xs">
					<Text variant="subHeading2" text="right">
						{amount.actual.toFixed(2)}
					</Text>
					<Text variant="body3" color="$neutral2" text="right">
						~{`${rate?.symbol} ${eqvAmount.toFixed(2)}`}
					</Text>
				</YStack>
			</XStack>
		</TouchableArea>
	);
}
