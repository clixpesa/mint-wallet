import { AccountIcon } from "@/components/account/AccountIcon";
import { Screen } from "@/components/layout/Screen";
import { editRosca, getRoscaMembers } from "@/features/contracts/roscas";
import { getChainInfo, useWalletContext } from "@/features/wallet";
import { useEnabledChains } from "@/features/wallet/hooks";
import {
	Button,
	ScrollView,
	Text,
	TextInput,
	TouchableArea,
	XStack,
	YStack,
} from "@/ui";
import { Edit, Logout, Search, SendAction } from "@/ui/components/icons";
import { isSameAddress, shortenAddress } from "@/utilities/addresses";
import {
	collection,
	getDocs,
	getFirestore,
	query,
	where,
} from "@react-native-firebase/firestore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import type { Address } from "viem";

export default function GroupInfo() {
	const params = useLocalSearchParams();
	const { defaultChainId } = useEnabledChains();
	const chain = getChainInfo(defaultChainId);
	const [edit, setEdit] = useState<boolean>(false);
	const [name, setName] = useState<string>(params.name as string);
	const [members, setMembers] = useState<Address[]>([]);
	const { updateCurrentChainId, mainAccount } = useWalletContext();
	const [userMap, setUserMap] = useState<
		Map<
			Address,
			{ tag: string; evmAddress: string; displayName: string | null } | null
		>
	>(new Map());
	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		setIsLoading(true);
		const getSpace = async () => {
			const members = await getRoscaMembers({
				chainId: defaultChainId,
				spaceId: params.spaceId as string,
			});

			if (members) setMembers(members);
			const userMap = await getMemberDetails(members);
			setUserMap(userMap);
			setIsLoading(false);
		};
		setIsLoading(false);
		getSpace();
	}, [defaultChainId]);

	const onCancel = () => {
		//setDate(new Date(Number(params.deadline)));
		setName(params.name as string);
		//setGoal(params.goal as string);
	};
	const onPressSave = async () => {
		setIsLoading(true);
		if (mainAccount) {
			const reciept = await editRosca({
				account: mainAccount,
				chainId: defaultChainId,
				name: name,
				//targetAmount: goal,
				//targetDate: date.valueOf(),
				spaceId: params.spaceId as string,
			});
			console.log(reciept);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		updateCurrentChainId(defaultChainId);
	}, [defaultChainId, updateCurrentChainId]);

	const getMemberDetails = async (members: Address[]) => {
		const batchSize = 30;
		const usersCollection = collection(getFirestore(), "USERS");
		const userMap = new Map<
			Address,
			{ tag: string; evmAddress: string; displayName: string | null } | null
		>();
		for (let i = 0; i < members.length; i += batchSize) {
			const batch = members.slice(i, i + batchSize);

			const querySnapshot = await getDocs(
				query(usersCollection, where("customClaims.evmAddr", "in", batch)),
			);

			const foundUsers = new Map<
				Address,
				{ tag: string; evmAddress: string; displayName: string | null }
			>();
			querySnapshot.forEach((doc) => {
				const user = doc.data();
				if (user.customClaims?.evmAddr) {
					foundUsers.set(user.customClaims.evmAddr, {
						tag: user.customClaims.tag,
						evmAddress: user.customClaims.evmAddr,
						displayName: user.displayName,
					});
				}
			});
			batch.forEach((Addr) => {
				userMap.set(Addr, foundUsers.get(Addr) || null);
			});
		}
		return userMap;
	};
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
									onPress={() => setEdit(!edit)}
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
					{edit ? null : (
						<YStack gap="$2xs" mx="$xl">
							<Text variant="subHeading1">{name}</Text>
						</YStack>
					)}
					{edit ? (
						<XStack justify="space-between" items="center">
							<TextInput
								width="100%"
								placeholder={name}
								value={name}
								onChangeText={(text) => setName(text)}
							/>
						</XStack>
					) : null}
					{edit ? (
						<XStack gap="$md" self="center" mt="$xl">
							<Button
								variant="branded"
								emphasis="secondary"
								width="30%"
								onPress={() => {
									onCancel();
								}}
							>
								Cancel
							</Button>
							<Button
								variant="branded"
								width="30%"
								loading={isLoading}
								onPress={() => {
									setEdit(!edit);
									onPressSave();
								}}
							>
								{isLoading ? "Saving " : "Save"}
							</Button>
						</XStack>
					) : null}
					<XStack justify="space-between" items="center" mx="$lg" mt="$xl">
						<Text>{members.length} members</Text>
						<Search size={22} color="$neutral1" />
					</XStack>
					<YStack bg="$surface1" p="$sm" rounded="$lg" gap="$md">
						{members.map((member) => {
							const user = userMap.get(member);
							return (
								<XStack items="center" justify="space-between" key={member}>
									<XStack gap="$sm" items="center">
										<AccountIcon address={member} size={40} />
										<YStack gap="$2xs">
											<Text>{user?.displayName ?? `@${user?.tag}`}</Text>
											<Text variant="body4">
												{shortenAddress(user?.evmAddress, 5)}
											</Text>
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
							);
						})}
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
