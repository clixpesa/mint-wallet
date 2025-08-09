import { AccountIcon } from "@/components/account/AccountIcon";
import { Screen } from "@/components/layout/Screen";
import { getRoscaMembers } from "@/features/contracts/roscas";
import { getChainInfo } from "@/features/wallet";
import { useEnabledChains } from "@/features/wallet/hooks";
import { ScrollView, Text, TouchableArea, XStack, YStack } from "@/ui";
import { Edit, Logout, Search, SendAction } from "@/ui/components/icons";
import { isSameAddress, shortenAddress } from "@/utilities/addresses";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import type { Address } from "viem";

export default function GroupInfo() {
	const params = useLocalSearchParams();
	const { defaultChainId } = useEnabledChains();
	const chain = getChainInfo(defaultChainId);
	const [members, setMembers] = useState<Address[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		setIsLoading(true);
		const getSpace = async () => {
			const members = await getRoscaMembers({
				chainId: defaultChainId,
				spaceId: params.spaceId as string,
			});

			if (members) setMembers(members);
			setIsLoading(false);
		};
		setIsLoading(false);
		getSpace();
	}, [defaultChainId]);
	return (
		<Screen>
			<ScrollView showsVerticalScrollIndicator={false} width="100%">
				<YStack mx="$sm" my="$lg" gap="$sm">
					<XStack justify="space-between" items="center" mx="$xl">
						<TouchableArea onPress={() => {}}>
							<AccountIcon
								address={
									chain.contracts?.roscas.address
										? chain.contracts?.roscas.address
										: "0x765de816845861e75a25fca122bb6898b8b1282a"
								}
								size={60}
								showBorder={true}
								borderColor="$tealVibrant"
							/>
						</TouchableArea>
						<YStack gap="$xs" items="flex-end">
							<XStack gap="$sm">
								<TouchableArea
									borderWidth={2}
									borderColor="$surface3Hovered"
									rounded="$md"
								>
									<Edit size={24} m="$xs" color="$neutral2" />
								</TouchableArea>
								<TouchableArea
									borderWidth={2}
									borderColor="$surface3Hovered"
									rounded="$2xl"
									onPress={() => {
										Alert.alert(
											"Keep Calm!",
											"Inviting your friends through links is coming soon.",
										);
									}}
								>
									<XStack items="center" m="$xs" gap="$xs">
										<SendAction size={24} color="$neutral2" />
										<Text variant="buttonLabel2" mr="$2xs" color="$neutral2">
											Share
										</Text>
									</XStack>
								</TouchableArea>
							</XStack>
							<Text color="$neutral2" text="right" variant="body3">
								{params.spaceId}
							</Text>
						</YStack>
					</XStack>
					<YStack gap="$2xs" mx="$xl">
						<Text variant="subHeading1">{params.name}</Text>
					</YStack>
					<XStack justify="space-between" items="center" mx="$lg" mt="$xl">
						<Text>{members.length} members</Text>
						<Search size={22} color="$neutral1" />
					</XStack>
					<YStack bg="$surface1" p="$sm" rounded="$lg" gap="$md">
						{members.map((member, index) => (
							<XStack items="center" justify="space-between" key={member}>
								<XStack gap="$sm" items="center">
									<AccountIcon address={member} size={40} />
									<YStack gap="$2xs">
										<Text>Member {index + 1}</Text>
										<Text variant="body4">{shortenAddress(member, 5)}</Text>
									</YStack>
								</XStack>
								{isSameAddress(member, params.admin as Address) ? (
									<Text
										py={3}
										px={12}
										bg="$accent2"
										rounded="$2xl"
										color="$accent1"
									>
										Admin
									</Text>
								) : null}
							</XStack>
						))}
					</YStack>

					<XStack
						bg="$surface1"
						py="$sm"
						px="$md"
						rounded="$lg"
						gap="$md"
						items="center"
					>
						<Logout size={24} color="$statusCritical" />
						<Text color="$statusCritical">Exit group</Text>
					</XStack>
				</YStack>
			</ScrollView>
		</Screen>
	);
}
