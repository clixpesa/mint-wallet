import { HeaderBackButton } from "@/components/Buttons/HeaderNavButtons";
import { AccountIcon } from "@/components/account/AccountIcon";
import { TokenItem } from "@/components/lists/TokenItem";
import { TokenLogo } from "@/components/logos/TokenLogo";
import type { ChainId } from "@/features/wallet";
import {
	Button,
	Input,
	Separator,
	Spacer,
	Text,
	TouchableArea,
	View,
	XStack,
	YStack,
} from "@/ui";
import {
	ArrowDown,
	ArrowUpDown,
	RotatableChevron,
	Search,
	X,
} from "@/ui/components/icons";
import { fonts } from "@/ui/theme/fonts";
import { shortenAddress } from "@/utilities/addresses";
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";

type HeaderParams = {
	address: Address;
	name: string;
};

export default function SendScreen() {
	const params: HeaderParams = useLocalSearchParams();
	const inputRef = useRef<Input>(null);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [amount, setAmount] = useState<string>();
	const [useCurrency, setUseCurrency] = useState<boolean>(true);
	const [isOverdraft, setIsOverdraft] = useState<boolean>(true);
	const [isReview, setIsReview] = useState<boolean>(true);
	const [tokenInfo, setTokenInfo] = useState({
		symbol: "KELI",
		chainId: 43114,
		logoUrl: require("@/ui/assets/images/token-logos/keli-logo.png"),
		balance: 2300,
	});

	console.log(tokenInfo);
	const tokens = [
		{
			id: "43114-KELI",
			name: "KES Lira",
			symbol: "KELI",
			logoUrl: require("@/ui/assets/images/token-logos/keli-logo.png"),
			chainId: 43114,
			balance: 2300,
			balanceUSD: 17.76,
		},
		{
			id: "43114-USDC",
			name: "USD Coin",
			symbol: "USDC",
			logoUrl: require("@/ui/assets/images/token-logos/usdc-logo.png"),
			chainId: 43114,
			balance: 230,
			balanceUSD: 230,
		},
		{
			id: "43114-USDT",
			name: "Tether USD",
			symbol: "USDT",
			logoUrl: require("@/ui/assets/images/token-logos/tether-logo.png"),
			chainId: 42220,
			balance: 20,
			balanceUSD: 20,
		},
	];

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

	return (
		<View flex={1} items="center" bg="$surface1">
			<Header address={params.address} name={params.name} />
			<YStack gap="$xs" width="92%" mt="$5xl" items="center">
				<XStack items="center">
					{useCurrency ? (
						<Text
							fontSize={fonts.heading2.fontSize}
							fontWeight="800"
							lineHeight={52}
						>
							Ksh
						</Text>
					) : null}
					<Input
						ref={inputRef}
						fontSize={fonts.heading2.fontSize + 10}
						fontWeight="800"
						autoFocus
						cursorColor="$surface3"
						maxW="75%"
						keyboardType="number-pad"
						placeholder="0"
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
							KELI
						</Text>
					)}
				</XStack>
				<TouchableArea onPress={() => setUseCurrency(!useCurrency)}>
					{useCurrency ? (
						<XStack gap="$2xs" items="center">
							<Text variant="subHeading1">{amount ? amount : "0.00"} KELI</Text>
							<ArrowUpDown size={20} color="$neutral1" />
						</XStack>
					) : (
						<XStack gap="$2xs" items="center">
							<Text variant="subHeading1">
								~Ksh {amount ? Number(amount).toFixed(2) : "0.00"}
							</Text>
							<ArrowUpDown size={20} color="$neutral1" />
						</XStack>
					)}
				</TouchableArea>
				<TouchableArea
					p="$xs"
					pr="$sm"
					bg="$surface3"
					rounded="$full"
					mt="$lg"
					onPress={() => {
						setIsReview(false);
						onOpenModal();
					}}
				>
					<XStack items="center" gap="$sm">
						<TokenLogo
							chainId={tokenInfo.chainId}
							symbol={tokenInfo.symbol}
							url={tokenInfo.logoUrl}
							size={32}
						/>
						<Text variant="subHeading2">
							{tokenInfo.symbol} -{" "}
							{useCurrency
								? `Ksh${(tokenInfo.balance * 0.99).toFixed(2)}`
								: tokenInfo.balance.toFixed(3)}
						</Text>
						<RotatableChevron direction="down" color="$neutral1" ml={-10} />
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
				snapPoints={isReview ? ["55%"] : ["50%", "90%"]}
				backdropComponent={renderBackdrop}
				onDismiss={() => inputRef.current?.focus()}
			>
				<BottomSheetView style={{ flex: 1, alignItems: "center" }}>
					{isReview ? (
						<ReviewContent
							tokenInfo={tokenInfo}
							amount={amount ? amount : "0.00"}
							useCurrency={useCurrency}
							recipient={params}
							isOverdraft={isOverdraft}
						/>
					) : (
						<TokenList
							tokens={tokens}
							onPress={(token) => {
								bottomSheetModalRef.current?.dismiss();
								setTokenInfo(token);
							}}
						/>
					)}
				</BottomSheetView>
			</BottomSheetModal>
		</View>
	);
}

const Header = ({ address, name }: HeaderParams) => {
	return (
		<XStack
			width="100%"
			items="center"
			py="$xs"
			px="$sm"
			justify="space-between"
		>
			<XStack gap="$sm" items="center">
				<HeaderBackButton />
				<Text variant="subHeading1" fontWeight="$md" color="$neutral1">
					Send to {name}
				</Text>
			</XStack>
			<TouchableArea rounded="$full" px="$sm">
				<AccountIcon size={34} address={address} />
			</TouchableArea>
		</XStack>
	);
};

type ReviewContentType = {
	tokenInfo: { chainId: ChainId; symbol: string; logoUrl: string };
	recipient: { name: string; address: Address };
	amount: string;
	useCurrency: boolean;
	isOverdraft: boolean;
};

const ReviewContent = ({
	tokenInfo,
	amount,
	useCurrency,
	isOverdraft,
	recipient,
}: ReviewContentType) => {
	console.log(recipient);
	return (
		<>
			<YStack gap="$md" mt="$lg" width="85%">
				<Text>You're sending {isOverdraft ? "with Jazisha" : null}</Text>
				<XStack width="100%" justify="space-between" items="center" pr="$2xs">
					<YStack>
						<Text
							variant="heading3"
							color={isOverdraft ? "$blueVibrant" : "$neutral1"}
						>
							{amount} KELI
						</Text>
						<Text color={isOverdraft ? "$blueBase" : "$neutral2"}>
							Ksh {Number(amount).toFixed(2)}
						</Text>
					</YStack>
					<TokenLogo
						chainId={tokenInfo.chainId}
						symbol={tokenInfo.symbol}
						url={tokenInfo.logoUrl}
						size={42}
					/>
				</XStack>
				<ArrowDown size={30} color="$neutral2" />
				<XStack width="100%" justify="space-between" items="center">
					<YStack gap="$2xs">
						<Text variant="subHeading1">{recipient.name}</Text>
						<Text color="$neutral2">
							{recipient.name.startsWith("0x")
								? "External Address"
								: shortenAddress(recipient.address, 5)}
						</Text>
					</YStack>
					<AccountIcon size={46} address={recipient.address} />
				</XStack>
				<Separator />
				<YStack gap="$xs">
					{isOverdraft ? (
						<XStack justify="space-between">
							<Text color="$blueVibrant">Jazisha:</Text>
							<Text variant="subHeading2" color="$blueVibrant">
								Ksh 12.00
							</Text>
						</XStack>
					) : null}
					<XStack justify="space-between">
						<Text>Fee:</Text>
						<Text variant="subHeading2">Ksh 12.00</Text>
					</XStack>
				</YStack>
			</YStack>
			<Spacer />
			<Button
				size="lg"
				variant="branded"
				/*bg="$blueBase"
				pressStyle={{
					bg: "$blueVibrant",
				}}*/
				b="$3xl"
				position="absolute"
				width="85%"
			>
				Confirm send
			</Button>
		</>
	);
};

type Token = {
	id: string;
	name: string;
	symbol: string;
	logoUrl: string;
	chainId: ChainId;
	balance: number;
	balanceUSD: number;
};

const TokenList = ({
	tokens,
	onPress,
}: { tokens: Token[]; onPress: (item: Token) => void }) => {
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
				{tokens.map((item) => (
					<TouchableArea key={item.id} onPress={() => onPress(item)}>
						<TokenItem
							tokenInfo={{
								name: item.name,
								symbol: item.symbol,
								logoUrl: item.logoUrl,
								chainId: item.chainId,
							}}
							amount={{
								actual: item.balance,
								inUSD: item.balanceUSD,
							}}
						/>
					</TouchableArea>
				))}
			</YStack>
		</YStack>
	);
};
