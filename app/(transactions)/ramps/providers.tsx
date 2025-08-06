import { AccountIcon } from "@/components/account/AccountIcon";
import { Screen } from "@/components/layout/Screen";
import { useWalletState } from "@/features/wallet/walletState";
import {
	Separator,
	Text,
	TouchableArea,
	UniversalImage,
	XStack,
	YStack,
} from "@/ui";
import { CheckCircleFilled, RotatableChevron } from "@/ui/components/icons";
import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";

export default function ProvidersScreen() {
	const onramp = useWalletState((s) => s.onramp);
	const setOnramp = useWalletState((s) => s.setOnramp);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const providerLogo =
		onramp.provider === "payd"
			? require("@/ui/assets/images/provider-logos/payd-circular.png")
			: require("@/ui/assets/images/provider-logos/pretium-circular.png");

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
		<Screen title="Change payment method">
			<YStack width="90%" gap="$vs" mt="$xl">
				<Text variant="subHeading1">Provider</Text>
				<TouchableArea onPress={() => bottomSheetModalRef.current?.present()}>
					<XStack
						justify="space-between"
						p="$md"
						py="$sm"
						bg="$surface3"
						rounded="$lg"
						items="center"
					>
						<XStack items="center" gap="$sm">
							<AccountIcon
								address="0x456a3D042C0DbD3db53D5489e98dFb038553B0d0"
								size={32}
								avatarUri={providerLogo}
							/>
							<Text variant="subHeading2" fontSize={18}>
								{onramp.provider.charAt(0).toUpperCase() +
									onramp.provider.slice(1)}
							</Text>
						</XStack>
						<RotatableChevron direction="down" />
					</XStack>
				</TouchableArea>
			</YStack>
			<YStack width="90%" gap="$vs" mt="$xl">
				<Text variant="subHeading1">Payment Methods</Text>
				<Text color="$neutral2" variant="body3" mb="$sm">
					An STK Push will be sent to prompt you to authorise a transaction on
					your mobile money
				</Text>
				<XStack
					justify="space-between"
					p="$md"
					py="$sm"
					bg="$surface3"
					rounded="$lg"
					items="center"
				>
					<XStack items="center" gap="$sm">
						<UniversalImage
							allowLocalUri
							//fallback={fallback}
							size={{ height: 32, width: 32 }}
							style={{
								image: {
									borderRadius: 32 / 2,
									zIndex: 1,
								},
							}}
							uri={require("@/ui/assets/images/provider-logos/mpesa.png")}
						/>
						<Text fontSize={18}>MPESA</Text>
					</XStack>
					<CheckCircleFilled color="$accent1" size={24} />
				</XStack>
				<XStack
					justify="space-between"
					p="$md"
					py="$sm"
					bg="$surface3"
					rounded="$lg"
					items="center"
				>
					<XStack items="center" gap="$sm">
						<AccountIcon
							address="0x456a3D042C0DbD3db53D5489e98dFb038553B0d0"
							size={32}
							avatarUri={require("@/ui/assets/images/provider-logos/aitelmoney.png")}
						/>
						<Text fontSize={18}>Airtel Money</Text>
					</XStack>
					<Text variant="body4" color="$neutral2">
						Coming soon
					</Text>
				</XStack>
			</YStack>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				snapPoints={["52%"]}
				backdropComponent={renderBackdrop}
				onDismiss={() => {}}
			>
				<BottomSheetView style={{ flex: 1, alignItems: "center" }}>
					<YStack gap="$sm" width="90%" mt="$xl" mb="$4xl">
						<YStack mb="$md">
							<Text variant="body3" text="center">
								External providers are used to process fiat to crypto purchases.
							</Text>
							<Text variant="body3" text="center" color="$neutral2">
								Rates vary between providers.
							</Text>
						</YStack>
						<TouchableArea
							onPress={() => {
								//setOnramp("payd", "mpesa");
								bottomSheetModalRef.current?.close();
							}}
						>
							<XStack justify="space-between" items="center">
								<XStack items="center" gap="$sm">
									<AccountIcon
										address="0x456a3D042C0DbD3db53D5489e98dFb038553B0d0"
										size={42}
										avatarUri={require("@/ui/assets/images/provider-logos/payd-circular.png")}
									/>

									<YStack width="80%" gap="$3xs">
										<XStack justify="space-between">
											<Text>Payd</Text>
											<Text color="$statusCritical">Under maintenance!</Text>
										</XStack>
										<Text variant="body4" color="$neutral2">
											Simplified Payments in minutes.
										</Text>
									</YStack>
								</XStack>
								<RotatableChevron direction="right" />
							</XStack>
						</TouchableArea>
						<Separator />
						<TouchableArea
							onPress={() => {
								setOnramp("pretium", "mpesa");
								bottomSheetModalRef.current?.close();
							}}
						>
							<XStack justify="space-between" items="center">
								<XStack items="center" gap="$sm">
									<AccountIcon
										address="0x456a3D042C0DbD3db53D5489e98dFb038553B0d0"
										size={42}
										avatarUri={require("@/ui/assets/images/provider-logos/pretium-circular.png")}
									/>
									<YStack width="80%" gap="$3xs">
										<Text>Pretium</Text>
										<Text variant="body4" color="$neutral2">
											Unlocking the value of cypto coins
										</Text>
									</YStack>
								</XStack>
								<RotatableChevron direction="right" />
							</XStack>
						</TouchableArea>
					</YStack>
				</BottomSheetView>
			</BottomSheetModal>
		</Screen>
	);
}
