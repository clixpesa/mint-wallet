import { BackButton } from "@/components/Buttons/BackButton";
import {
	frequencyOptions,
	getRosca,
	isUserSlotted,
} from "@/features/contracts/roscas";
import { useAppState } from "@/features/essentials/appState";
import { getChainInfo, getRate, getTokensByChainId } from "@/features/wallet";
import { useEnabledChains } from "@/features/wallet/hooks";
import { useWalletState } from "@/features/wallet/walletState";
import {
	Button,
	IconButton,
	LinearGradient,
	Separator,
	Stack,
	Text,
	TouchableArea,
	View,
	XStack,
	YStack,
} from "@/ui";
import {
	Hamburger,
	ReceiveAlt,
	RotatableChevron,
	SendAction,
} from "@/ui/components/icons";
import { isSameAddress } from "@/utilities/addresses";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Progress } from "tamagui";
import type { Address } from "viem";

export default function SpaceHome() {
	const params = useLocalSearchParams();
	const user = useAppState((s) => s.user);
	const currency = useWalletState((s) => s.currency);
	const { defaultChainId } = useEnabledChains();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { symbol, conversionRate } = getRate(currency);
	const chain = getChainInfo(defaultChainId);
	const [userSlotted, setIsSlotted] = useState<{
		isSlotted: boolean;
		freeSlots: number;
	}>({
		isSlotted: true,
		freeSlots: 0,
	});

	const [spaceInfo, setSpaceInfo] = useState({
		spaceId: params.spaceId as string,
		name: params.name as string,
		admin: "0x",
		startDate: Number(params.startDate),
		memberCount: Number(params.memberCount),
		interval: Number(params.interval),
		token: "0x",
		totalBalance: 0,
		yield: 0,
		loan: 0,
		payoutAmount: Number(params.payoutAmount),
	});

	const [slotInfo, setSlotInfo] = useState({
		amount: 0,
		deadline: Date.now(),
		targetAmount: spaceInfo.payoutAmount / spaceInfo.memberCount,
		yield: 0,
	});

	const tokens = getTokensByChainId(defaultChainId);
	const spaceToken = tokens.find((token) =>
		isSameAddress(token.address, spaceInfo.token),
	);

	const isTarget = slotInfo.amount === slotInfo.targetAmount;
	const date: Date = new Date(slotInfo.deadline);
	const rate = spaceToken?.symbol.includes("USD") ? conversionRate : 1;
	const balInCurreny = spaceInfo.totalBalance * rate;
	const balSplit = balInCurreny.toFixed(2).split(".");

	const progress = Number(
		((slotInfo.amount / slotInfo.targetAmount) * 100).toFixed(0),
	);
	const transactions = [];

	useEffect(() => {
		setIsLoading(true);
		const getSpace = async () => {
			const savings = await getRosca({
				chainId: defaultChainId,
				spaceId: spaceInfo.spaceId,
			});
			const userSlotted = await isUserSlotted({
				chainId: defaultChainId,
				spaceId: spaceInfo.spaceId,
				userAddress: user.mainAddress as Address,
			});
			if (savings) setSpaceInfo(savings);

			setIsSlotted(userSlotted);
			setIsLoading(false);
		};
		setIsLoading(false);
		getSpace();
	}, [defaultChainId, spaceInfo.spaceId, user]);

	return (
		<View flex={1} bg="$surface1" items="center">
			<LinearGradient
				width="100%"
				height="100%"
				colors={["$surface1", "$surface3"]}
				position="absolute"
			/>
			<YStack gap="$md" width="100%" items="center">
				<XStack
					height={265}
					bg="$blueLight"
					width="100%"
					justify="space-between"
					items="flex-end"
					px="$xl"
					py="$xl"
				>
					<Stack position="absolute" t="$lg" l="$lg">
						<BackButton
							color="$neutral2"
							size={28}
							onPressBack={() => router.replace("/(tabs)/spaces")}
						/>
					</Stack>
					<YStack gap="$xl">
						<Text variant="subHeading1" fontSize={24}>
							{spaceInfo.name}
						</Text>
						<YStack gap="$xs">
							<Text
								variant="heading3"
								fontWeight="800"
								color="$neutral1"
								fontSize={30}
							>
								{`${symbol} ${balSplit[0]}`}
								<Text
									variant="heading3"
									fontWeight="800"
									color="$neutral3"
									fontSize={30}
								>
									.{balSplit[1]}
								</Text>
							</Text>
							<XStack items="center" gap="$2xs">
								<Text variant="subHeading2" color="$neutral2">
									≈ $
									{((spaceInfo.totalBalance - spaceInfo.yield) / rate).toFixed(
										2,
									)}
								</Text>
								<TouchableArea
									bg="$tealThemed"
									rounded="$full"
									py="$4xs"
									px="$sm"
									onPress={() => {}}
								>
									<Text variant="subHeading2" color="$neutral1">
										+{(spaceInfo.yield / rate).toFixed(2)}
									</Text>
								</TouchableArea>
							</XStack>
						</YStack>
					</YStack>
					<IconButton
						icon={<Hamburger size={24} color="$accent1" />}
						size="md"
						variant="branded"
						emphasis="secondary"
					/>
				</XStack>
				{userSlotted.isSlotted ? (
					<YStack
						gap="$sm"
						width="92%"
						px="$sm"
						pt="$md"
						pb="$xl"
						rounded="$lg"
						bg="$surface1"
					>
						<XStack justify="space-between">
							<Text fontWeight="$md">Saved ${slotInfo.amount.toFixed(2)}</Text>
							<Text>Target: ${slotInfo.targetAmount.toFixed(2)}</Text>
						</XStack>
						<Progress value={progress} height="$xs" bg="$tealThemed">
							<Progress.Indicator bg="$tealBase" animation="80ms-ease-in-out" />
						</Progress>
						<Text>
							{date.toLocaleDateString("en-US", {
								weekday: "short",
								day: "numeric",
								month: "short",
								year: "numeric",
							})}
							{/*<Text color="$neutral2">- 1 month to go</Text>*/}
						</Text>
					</YStack>
				) : (
					<YStack gap="$xs" width="92%">
						<Text ml="$lg">
							Pick your slot before{" "}
							{date.toLocaleDateString("en-US", {
								weekday: "short",
								day: "numeric",
								month: "short",
							})}
						</Text>
						<YStack gap="$xs" p="$sm" rounded="$md" bg="$surface1">
							<XStack justify="space-between">
								<YStack gap="$2xs">
									<Text color="$neutral2" variant="body3">
										Target payout
									</Text>
									<Text variant="subHeading1" color="$tealDark">
										{symbol} {(spaceInfo.payoutAmount * rate).toFixed(2)}
									</Text>
								</YStack>
								<Button
									variant="branded"
									width="30%"
									rounded="$full"
									icon={<RotatableChevron direction="right" />}
									iconPosition="after"
									onPress={() =>
										router.navigate({
											pathname: "/(spaces)/roscas/slots",
											params: {
												spaceId: spaceInfo.spaceId,
											},
										})
									}
								>
									Pick
								</Button>
							</XStack>
							<XStack items="center">
								<Text mr="$sm" variant="body3">
									Pay
								</Text>
								<Separator />
							</XStack>
							<XStack justify="space-between">
								<Text>
									{symbol}{" "}
									{(
										(spaceInfo.payoutAmount / spaceInfo.memberCount) *
										rate
									).toFixed(2)}{" "}
									<Text color="$neutral2">
										{
											frequencyOptions.find(
												(frq) => frq.interval === spaceInfo.interval,
											)?.name
										}
									</Text>
								</Text>
								<Text>{userSlotted.freeSlots} Free slots</Text>
							</XStack>
						</YStack>
					</YStack>
				)}
				{/*<TransactionsCard transactions={transactions} isLoading={isLoading} />*/}
			</YStack>
			<XStack justify="space-between" position="absolute" b="$3xl" width="92%">
				<Button
					variant="branded"
					emphasis={slotInfo.amount > 0 ? "secondary" : "primary"}
					size="lg"
					width={slotInfo.amount > 0 ? (isTarget ? "25%" : "48%") : "72%"}
					icon={<SendAction size={24} />}
					onPress={async () => {
						/*router.navigate({
							pathname: "/(spaces)/add-cash",
							params: {
								address: chain.contracts?.goalSavings.address,
								name: spaceInfo.name,
								id: spaceInfo.spaceId,
							},
						})*/
						console.log("Requesting");
						const responce = await isUserSlotted({
							chainId: defaultChainId,
							spaceId: "0x5f951f49f67f43ee",
							userAddress: "0x590392F06AC76c82F49C01219CF121A553Aa2e58",
						});
						console.log(responce);
					}}
				>
					{isTarget ? null : "Add Cash"}
				</Button>
				<Button
					variant="branded"
					emphasis={isTarget ? "primary" : "secondary"}
					size="lg"
					width={slotInfo.amount > 0 ? (isTarget ? "72%" : "48%") : "25%"}
					icon={<ReceiveAlt size={24} />}
					onPress={() =>
						router.navigate({
							pathname: "/(spaces)/cash-out",
							params: {
								address: chain.contracts?.goalSavings.address,
								name: spaceInfo.name,
								id: spaceInfo.spaceId,
							},
						})
					}
				>
					{slotInfo.amount > 0 ? "Cash Out" : null}
				</Button>
			</XStack>
		</View>
	);
}
