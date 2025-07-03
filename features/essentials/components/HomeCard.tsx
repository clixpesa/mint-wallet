import { getRate } from "@/features/wallet";
import { useBalances } from "@/features/wallet/walletState";
import {
	Button,
	Spacer,
	Stack,
	Text,
	TouchableArea,
	XStack,
	YStack,
} from "@/ui";
import { Currency, Jazisha, RotatableChevron } from "@/ui/components/icons";
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { HomeActions } from "./HomeActions";

export const HomeCard = () => {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const { totalBalanceUSD, overdraft, currency } = useBalances();
	const { symbol, conversionRate } = getRate(currency);
	const balInCurreny = totalBalanceUSD * conversionRate;
	const balSplit = balInCurreny.toFixed(2).split(".");

	const onOpenModal = useCallback(() => {
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
		<YStack width="95%" mt="$sm">
			<XStack justify="space-between" mx="$2xs">
				<YStack gap="$2xs">
					<Text color="$neutral2">Your Balance </Text>
					<Text variant="heading2" fontWeight="800" color="$neutral1">
						{`${symbol} ${balSplit[0]}`}
						<Text variant="heading2" fontWeight="800" color="$neutral3">
							.{balSplit[1]}
						</Text>
					</Text>
					<XStack items="center" gap="$2xs">
						<Text variant="subHeading2" color="$neutral2">
							≈ ${totalBalanceUSD.toFixed(2)}
						</Text>
						<TouchableArea
							bg="$bluePastel"
							rounded="$full"
							py="$4xs"
							px="$sm"
							onPress={onOpenModal}
						>
							<Text variant="subHeading2" color="$neutral1">
								+{overdraft.toFixed(2)}
							</Text>
						</TouchableArea>
					</XStack>
				</YStack>
				<TouchableArea
					onPress={() => {
						router.push("/(essentials)/tokens/overview");
					}}
				>
					<YStack
						items="center"
						bg="$surface3"
						borderTopRightRadius={16}
						borderEndEndRadius={16}
						borderRightWidth={2}
						borderColor="$surface3"
					>
						<RotatableChevron direction="right" color="$neutral2" mt="$2xs" />
						<Stack width="$4xl" items="center" py="$vs" overflow="hidden">
							<Currency
								size={54}
								rotate="-30deg"
								color="$accent1"
								opacity={0.85}
							/>
						</Stack>
					</YStack>
				</TouchableArea>
			</XStack>
			<HomeActions />
			<BottomSheetModal
				ref={bottomSheetModalRef}
				snapPoints={["52%"]}
				backdropComponent={renderBackdrop}
				onDismiss={() => {}}
			>
				<BottomSheetView style={{ flex: 1, alignItems: "center" }}>
					<JazishaContent />
				</BottomSheetView>
			</BottomSheetModal>
		</YStack>
	);
};

const JazishaContent = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleOnpress = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	};
	return (
		<>
			<YStack gap="$lg" mt="$md" items="center">
				<Stack p="$md" bg="$blueLight" rounded="$lg">
					<Jazisha size={32} color="$blueBase" />
				</Stack>
				<YStack width="80%" gap="$2xs">
					<Text variant="subHeading1" text="center" px="$2xl">
						Finalize what you need to with Jazisha!
					</Text>
					<Text text="center" color="$neutral2">
						Transfer or make a payment even on low balance with Clixpesa
						Overdraft.
					</Text>
				</YStack>
				<YStack width="70%" gap="$2xs" items="center">
					<Text>Available:</Text>
					<Text variant="heading3" fontWeight="600">
						0/100 USD
					</Text>
					<Text color="$neutral2">Only on CELO</Text>
				</YStack>
			</YStack>
			<Spacer />
			<Button
				size="lg"
				variant="branded"
				b="$3xl"
				position="absolute"
				width="85%"
				loading={isLoading}
				onPress={handleOnpress}
			>
				{isLoading ? "Subscribing..." : "Get started"}
			</Button>
		</>
	);
};
