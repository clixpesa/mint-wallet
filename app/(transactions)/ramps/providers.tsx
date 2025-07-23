import { AccountIcon } from "@/components/account/AccountIcon";
import { Screen } from "@/components/layout/Screen";
import { Text, UniversalImage, XStack, YStack } from "@/ui";
import { CheckCircleFilled, RotatableChevron } from "@/ui/components/icons";

export default function ProvidersScreen() {
	return (
		<Screen title="Change payment method">
			<YStack width="90%" gap="$vs" mt="$xl">
				<Text variant="subHeading1">Provider</Text>
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
						/>
						<Text variant="subHeading2" fontSize={18}>
							Payd
						</Text>
					</XStack>
					<RotatableChevron direction="down" />
				</XStack>
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
		</Screen>
	);
}
