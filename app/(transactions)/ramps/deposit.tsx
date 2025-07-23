import { HeaderBackButton } from "@/components/Buttons/HeaderNavButtons";
import { AccountIconWChainLogo } from "@/components/account/AccountIconWChainLogo";

import { TokenItem } from "@/components/lists/TokenItem";
import { TokenLogo } from "@/components/logos/TokenLogo";
import {
	type ChainId,
	type TokenWithBalance,
	getChainInfo,
	getRate,
	useWalletContext,
} from "@/features/wallet";
import { useEnabledChains, useEnabledTokens } from "@/features/wallet/hooks";
import { useWalletState } from "@/features/wallet/walletState";
import {
	Button,
	Input,
	Separator,
	Spacer,
	Stack,
	Text,
	TouchableArea,
	UniversalImage,
	View,
	XStack,
	YStack,
} from "@/ui";
import {
	ArrowUpDown,
	CheckmarkCircle,
	RotatableChevron,
	Search,
	X,
} from "@/ui/components/icons";
import { fonts } from "@/ui/theme/fonts";
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { useCallback, useEffect, useRef, useState } from "react";

export default function DepositScreen() {
	const params = useLocalSearchParams();
	const currency = useWalletState((s) => s.currency);
	const overdraft = useWalletState((s) => s.overdraft);
	const { symbol, conversionRate } = getRate(currency);
	const { defaultChainId } = useEnabledChains();
	const inputRef = useRef<Input>(null);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [amount, setAmount] = useState<string>();
	const [useCurrency, setUseCurrency] = useState<boolean>(true);
	const [isOverdraft, setIsOverdraft] = useState<boolean>(false);
	const [isReview, setIsReview] = useState<boolean>(true);
	const [isTxLoading, setIsTxLoading] = useState<boolean>(true);
	const [isSending, setIsSending] = useState<boolean>(false);
	const { updateCurrentChainId, mainAccount, isLoading } = useWalletContext();
	const [txHash, setTxHash] = useState<string>();

	let filter = "USD";
	if (params.token) filter = params.token.includes("USD") ? "USD" : "KES";

	const allTokens = useEnabledTokens();
	const tokens = allTokens.filter((token) => token.chainId === defaultChainId);
	const [tokenInfo, setTokenInfo] = useState(tokens[0]);
	const chain = getChainInfo(tokenInfo.chainId);

	const actualAmount = amount
		? useCurrency && tokenInfo.symbol.includes("USD")
			? (Number(amount) / conversionRate).toFixed(6)
			: amount
		: "0.00";
	const onOpenModal = useCallback(() => {
		inputRef.current?.blur();
		bottomSheetModalRef.current?.present();
	}, []);
	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				style={[props.style]}
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				opacity={0.4}
			/>
		),
		[],
	);

	const onConfirmSend = async () => {
		setIsSending(true);
		setIsTxLoading(true);
		if (mainAccount && amount) {
			console.log("Sending");
			setTxHash(txHash);
			setIsTxLoading(false);
		}
	};

	useEffect(() => {
		updateCurrentChainId(tokenInfo.chainId);
	}, [tokenInfo, updateCurrentChainId]);

	return (
		<View flex={1} items="center" bg="$surface1">
			<Header
				token={{ ...tokenInfo }}
				onPress={() => {
					setIsReview(false);
					onOpenModal();
				}}
			/>
			<YStack gap="$xs" width="92%" mt="$5xl" items="center">
				<XStack items="center">
					{useCurrency ? (
						<Text
							fontSize={fonts.heading2.fontSize}
							fontWeight="800"
							lineHeight={52}
						>
							{symbol}
						</Text>
					) : null}
					<Input
						ref={inputRef}
						fontSize={fonts.heading2.fontSize + 10}
						fontWeight="800"
						autoFocus
						bg="$transparent"
						cursorColor="$surface3"
						maxW="75%"
						keyboardType="number-pad"
						placeholder="0"
						color="$neutral1"
						height={60}
						onPress={() => inputRef.current?.focus()}
						value={amount}
						onChangeText={(text) => setAmount(text)}
					/>
					{useCurrency ? null : (
						<Text
							fontSize={fonts.heading2.fontSize}
							fontWeight="800"
							lineHeight={52}
						>
							{tokenInfo.symbol}
						</Text>
					)}
				</XStack>
				<TouchableArea onPress={() => setUseCurrency(!useCurrency)}>
					{useCurrency ? (
						<XStack gap="$2xs" items="center">
							<Text variant="subHeading1">
								{amount
									? tokenInfo.symbol.includes("SH") ||
										tokenInfo.symbol.includes("KES")
										? amount
										: (Number(amount) / conversionRate).toFixed(3)
									: "0.00"}{" "}
								{tokenInfo.symbol}
							</Text>
							<ArrowUpDown size={20} color="$neutral1" />
						</XStack>
					) : (
						<XStack gap="$2xs" items="center">
							<Text variant="subHeading1">
								~{symbol}{" "}
								{amount
									? tokenInfo.symbol.includes("SH")
										? amount
										: (Number(amount) * conversionRate).toFixed(2)
									: "0.00"}
							</Text>
							<ArrowUpDown size={20} color="$neutral1" />
						</XStack>
					)}
				</TouchableArea>
				<TouchableArea
					p="$xs"
					pr="$sm"
					bg="$surface3"
					rounded="$md"
					mt="$lg"
					onPress={() => router.navigate("/(transactions)/ramps/providers")}
				>
					<XStack items="center" gap="$sm" pl="$2xs">
						<AccountIconWChainLogo
							size={32}
							address="0x1BB5Bc2d6d1272C43a6823875E34c84f1B98113A"
							chainId={tokenInfo.chainId}
							avatarUri={require("@/ui/assets/images/provider-logos/mpesa.png")}
						/>
						<Text variant="subHeading2">Payd - MPESA</Text>
						<RotatableChevron direction="right" color="$neutral1" ml={-10} />
					</XStack>
				</TouchableArea>
			</YStack>
			<Spacer />
			<Button
				variant="branded"
				size="lg"
				b="$3xl"
				position="absolute"
				width="85%"
				isDisabled={!amount}
				onPress={() => {
					setIsReview(true);
					onOpenModal();
				}}
			>
				Review
			</Button>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				snapPoints={
					isReview ? (isSending ? ["100%"] : ["55%"]) : ["50%", "90%"]
				}
				backdropComponent={renderBackdrop}
				onDismiss={() => inputRef.current?.focus()}
				enableContentPanningGesture={!isSending}
				handleIndicatorStyle={isSending ? { backgroundColor: "#ffffff" } : null}
			>
				<BottomSheetView style={{ flex: 1, alignItems: "center" }}>
					{isReview ? (
						isSending ? (
							<SendContent
								tokenInfo={tokenInfo}
								amount={
									amount
										? useCurrency && tokenInfo.symbol.includes("USD")
											? Number(amount) / conversionRate
											: Number(amount)
										: 0
								}
								currency={{
									symbol: symbol,
									rate: conversionRate,
								}}
								provider={{ name: "Payd", method: "mpesa" }}
								isLoading={isTxLoading}
								onPressDone={() => router.back()}
								onViewReciept={() =>
									openBrowserAsync(
										`${chain.blockExplorers?.default.url}/tx/${txHash}`,
									)
								}
							/>
						) : (
							<ReviewContent
								tokenInfo={tokenInfo}
								amount={
									amount
										? useCurrency && tokenInfo.symbol.includes("USD")
											? Number(amount) / conversionRate
											: Number(amount)
										: 0
								}
								currency={{
									symbol: symbol,
									rate: conversionRate,
								}}
								provider={{ name: "Payd", method: "mpesa" }}
								isLoading={isLoading}
								onConfirmSend={onConfirmSend}
							/>
						)
					) : (
						<TokenList
							tokens={tokens}
							onPress={(token) => {
								bottomSheetModalRef.current?.close();
								setTokenInfo(token);
							}}
						/>
					)}
				</BottomSheetView>
			</BottomSheetModal>
		</View>
	);
}

const Header = ({
	token,
	onPress,
}: { token: TokenWithBalance; onPress: () => void }) => {
	return (
		<XStack width="100%" py="$xs" px="$sm" justify="space-between" mt="$xs">
			<XStack gap="$sm">
				<HeaderBackButton />
				<Text
					variant="subHeading1"
					fontWeight="$md"
					color="$neutral1"
					mt="$3xs"
				>
					Deposit
				</Text>
			</XStack>
			<TouchableArea onPress={onPress}>
				<XStack gap="$sm" items="center">
					<YStack>
						<Text
							variant="heading3"
							fontWeight="500"
							color="$neutral1"
							text="right"
							mt="$3xs"
						>
							{token.symbol}
						</Text>
						<Text variant="body3" text="right" color="$neutral2">
							{token.name}
						</Text>
					</YStack>
					<TokenLogo
						chainId={token.chainId}
						symbol={token.symbol}
						url={token.logo}
						size={42}
					/>
					<RotatableChevron direction="down" />
				</XStack>
			</TouchableArea>
		</XStack>
	);
};

type ReviewContentType = {
	tokenInfo: TokenWithBalance;
	amount: number;
	currency: {
		symbol: string;
		rate: number;
	};
	provider: {
		name: string;
		method: string;
	};
	isLoading: boolean;
	onConfirmSend: () => void;
};

const ReviewContent = ({
	tokenInfo,
	amount,
	currency,
	provider,
	isLoading,
	onConfirmSend,
}: ReviewContentType) => {
	return (
		<>
			<YStack gap="$md" mt="$lg" width="85%">
				<Text>You're adding</Text>
				<XStack width="100%" justify="space-between" items="center" pr="$2xs">
					<YStack>
						<Text variant="heading3" color="$neutral1">
							{amount.toFixed(3)} {tokenInfo.symbol}
						</Text>
						<Text color="$neutral2">
							{currency.symbol}{" "}
							{tokenInfo.symbol.includes("USD")
								? (Number(amount) * currency.rate).toFixed(2)
								: amount.toFixed(2)}
						</Text>
					</YStack>
					<TokenLogo
						chainId={tokenInfo.chainId}
						symbol={tokenInfo.symbol}
						url={tokenInfo.logo}
						size={42}
					/>
				</XStack>
				<XStack width="92%" items="center" gap="$lg">
					<Text>Via</Text>
					<Separator borderWidth={1} />
				</XStack>
				<XStack width="100%" justify="space-between" items="center" pr="$2xs">
					<YStack gap="$2xs">
						<Text variant="subHeading1">{provider.name} - MPESA</Text>
						<Text color="$neutral2">Instant</Text>
					</YStack>
					<AccountIconWChainLogo
						size={46}
						address="0x1BB5Bc2d6d1272C43a6823875E34c84f1B98113A"
						chainId={tokenInfo.chainId}
						avatarUri={require("@/ui/assets/images/provider-logos/mpesa.png")}
					/>
				</XStack>
				<Separator />

				<XStack justify="space-between">
					<Text>Fee:</Text>
					<XStack gap="$xs">
						<Text
							variant="subHeading2"
							textDecorationLine="line-through"
							color="$orangeBase"
						>
							Ksh 12.00
						</Text>
						<Text variant="subHeading2">0.00</Text>
					</XStack>
				</XStack>
			</YStack>

			<Spacer />
			<Button
				size="lg"
				variant="branded"
				b="$3xl"
				loading={isLoading}
				position="absolute"
				width="85%"
				onPress={onConfirmSend}
			>
				Confirm send
			</Button>
		</>
	);
};

const TokenList = ({
	tokens,
	onPress,
}: {
	tokens: TokenWithBalance[];
	onPress: (item: TokenWithBalance) => void;
}) => {
	const inputRef = useRef<Input>(null);
	const [searchText, setSearchText] = useState("");
	return (
		<YStack gap="$sm" mt="$xl" width="92%">
			<XStack
				borderWidth={2}
				borderColor="$surface3"
				rounded="$vl"
				items="center"
				px="$sm"
				gap="$vs"
				mb="$sm"
			>
				<Search size={24} color="$neutral2" />
				<Input
					ref={inputRef}
					fontSize="$lg"
					autoCapitalize="none"
					autoCorrect={false}
					px={1}
					placeholder="search token"
					height="$5xl"
					value={searchText}
					textContentType="none"
					//text={searchText.length > 23 ? "right" : "left"}
					maxW="81%"
					multiline={false}
					grow={1}
					onChangeText={(text) => setSearchText(text)}
				/>
				{searchText.length > 3 ? (
					<TouchableArea onPress={() => setSearchText("")} hitSlop={10}>
						<X size={24} color="$neutral2" />
					</TouchableArea>
				) : null}
			</XStack>
			<YStack
				bg="$surface1"
				width="100%"
				pt="$md"
				pb="$xl"
				rounded="$lg"
				gap="$lg"
			>
				{tokens.map((item) => {
					const tokenId = `${item.symbol}_${item.chainId}`;
					return (
						<TouchableArea key={tokenId} onPress={() => onPress(item)}>
							<TokenItem
								tokenInfo={{
									name: item.name,
									symbol: item.symbol,
									logoUrl: item.logo,
									chainId: item.chainId,
								}}
								amount={{
									actual: item.balance,
									inUSD: item.balanceUSD,
								}}
							/>
						</TouchableArea>
					);
				})}
			</YStack>
		</YStack>
	);
};

type SendContentType = {
	tokenInfo: { chainId: ChainId; symbol: string; logo: string };
	amount: number;
	currency: {
		symbol: string;
		rate: number;
	};
	provider: {
		name: string;
		method: string;
	};
	isLoading: boolean;
	onPressDone: () => void;
	onViewReciept: () => void;
};

const SendContent = ({
	tokenInfo,
	amount,
	currency,
	provider,
	isLoading,
	onPressDone,
	onViewReciept,
}: SendContentType) => {
	return (
		<Stack flex={1} justify="center">
			{isLoading ? (
				<Stack self="center" mr="$xl">
					<UniversalImage
						uri={require("@/ui/assets/gifs/send.gif")}
						size={{ height: 80, width: 80 }}
					/>
				</Stack>
			) : (
				<YStack gap="$md" width="85%" mb="$5xl">
					<YStack gap="$md">
						<CheckmarkCircle color="$statusSuccess" size={80} self="center" />
						<Text text="center">Your transfer was successfull!</Text>
					</YStack>
					<Text text="center" variant="subHeading1">
						You added
					</Text>
					<XStack width="100%" justify="space-between" items="center" pr="$2xs">
						<YStack>
							<Text variant="heading3" color={"$neutral1"}>
								{amount.toFixed(3)} {tokenInfo.symbol}
							</Text>
							<Text color={"$neutral2"}>
								{currency.symbol}{" "}
								{tokenInfo.symbol.includes("USD")
									? (Number(amount) * currency.rate).toFixed(2)
									: amount.toFixed(2)}
							</Text>
						</YStack>
						<TokenLogo
							chainId={tokenInfo.chainId}
							symbol={tokenInfo.symbol}
							url={tokenInfo.logo}
							size={42}
						/>
					</XStack>
					<XStack width="92%" items="center" gap="$lg">
						<Text>Via</Text>
						<Separator borderWidth={1} />
					</XStack>
					<XStack width="100%" justify="space-between" items="center" pr="$2xs">
						<YStack gap="$2xs">
							<Text variant="subHeading1">{provider.name} - MPESA</Text>
							<Text color="$neutral2">Instant</Text>
						</YStack>
						<AccountIconWChainLogo
							size={46}
							address="0x1BB5Bc2d6d1272C43a6823875E34c84f1B98113A"
							chainId={tokenInfo.chainId}
							avatarUri={require("@/ui/assets/images/provider-logos/mpesa.png")}
						/>
					</XStack>
					<YStack gap="$xs">
						<XStack justify="space-between">
							<Text>Fee:</Text>
							<XStack gap="$xs">
								<Text
									variant="subHeading2"
									textDecorationLine="line-through"
									color="$orangeBase"
								>
									Ksh 12.00
								</Text>
								<Text variant="subHeading2">0.00</Text>
							</XStack>
						</XStack>
					</YStack>
				</YStack>
			)}
			<YStack b="$3xl" gap="$md" position="absolute" width="100%">
				<Button
					size="lg"
					variant="branded"
					emphasis="tertiary"
					width="85%"
					onPress={onViewReciept}
				>
					View reciept
				</Button>
				<Button
					size="lg"
					variant="branded"
					loading={isLoading}
					width="85%"
					onPress={onPressDone}
				>
					Done
				</Button>
			</YStack>
		</Stack>
	);
};
