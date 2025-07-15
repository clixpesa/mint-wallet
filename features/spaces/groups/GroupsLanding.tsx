import type { GroupSpaceInfo } from "@/features/contracts/roscas";
import {
	Button,
	Separator,
	Spacer,
	Stack,
	Text,
	TouchableArea,
	Unicon,
	UniversalImage,
	UniversalImageResizeMode,
	View,
	XStack,
	YStack,
} from "@/ui";
import { GroupFill, RoscaFill } from "@/ui/components/icons";
import { isSameAddress } from "@/utilities/addresses";
import { router } from "expo-router";
import { useState } from "react";

export function GroupsLanding() {
	const userAddress = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [spaces, setSpaces] = useState<GroupSpaceInfo[]>([
		/*{
			spaceId: "0x12342",
			name: "Dream Chasers",
			admin: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
			token: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
			payoutAmount: 10000,
			interval: 604800,
			startDate: 1752575188,
			memberCount: 15,
		},
		{
			spaceId: "0x12345",
			name: "Superstars",
			admin: "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
			token: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
			payoutAmount: 100000,
			interval: 604800,
			startDate: 1752575188,
			memberCount: 15,
		},*/
	]);
	const iconSize = 42;

	return (
		<View flex={1} items="center" bg="$surface1" py="$3xl">
			{spaces.length === 0 && !isLoading ? (
				<>
					<YStack
						width="92%"
						p="$md"
						bg="$surface3"
						rounded="$xl"
						opacity={0.85}
						gap="$xl"
					>
						<XStack gap="$md">
							<Stack
								bg="$neutral3"
								height={42}
								rounded="$full"
								width={42}
								items="center"
								justify="center"
							>
								<GroupFill size={32} color="$surface1" />
							</Stack>
							<Stack width="83%">
								<Text variant="subHeading2">Save with family and friends</Text>
								<Text variant="body3" color="$neutral2">
									Save in groups and reach your goals together or challenge one
									another.
								</Text>
							</Stack>
						</XStack>
						<XStack gap="$md">
							<Stack
								bg="$neutral3"
								height={42}
								rounded="$full"
								width={42}
								items="center"
								justify="center"
							>
								<RoscaFill size={30} color="$surface1" />
							</Stack>
							<Stack width="83%">
								<Text variant="subHeading2">Join or create saving circles</Text>
								<Text variant="body3" color="$neutral2">
									Save in a circle and let your crew help you reach your goals.
								</Text>
							</Stack>
						</XStack>
					</YStack>
					<Spacer height="10%" />
					<YStack gap="$sm" width="85%" items="center">
						<Button
							variant="branded"
							size="lg"
							width="100%"
							onPress={() => router.navigate("/(spaces)/roscas/create")}
						>
							Create a group
						</Button>
						<Button
							variant="branded"
							emphasis="secondary"
							size="lg"
							width="100%"
						>
							Join a group
						</Button>
					</YStack>
				</>
			) : (
				<YStack gap="$xs" width="92%">
					{spaces.map((item) => (
						<TouchableArea
							key={item.spaceId}
							onPress={() =>
								router.navigate({
									pathname: "/(spaces)/roscas/[spaceId]",
									params: {
										...item,
									},
								})
							}
						>
							<YStack
								gap="$xs"
								borderWidth={1}
								borderBottomWidth={3}
								borderColor="$surface3"
								p="$md"
								rounded="$md"
								bg="$surface1"
								key={item.spaceId}
							>
								<XStack justify="space-between" items="center">
									<YStack gap="$2xs">
										<Text variant="subHeading2">{item.name}</Text>
										<Text variant="body3">
											Ksh 1000{" "}
											<Text color="$neutral2" variant="body3">
												Monthly
											</Text>
										</Text>
									</YStack>
									<XStack>
										<UniversalImage
											style={{ image: { borderRadius: iconSize } }}
											fallback={<Unicon address={item.admin} size={iconSize} />}
											size={{
												width: iconSize,
												height: iconSize,
												resizeMode: UniversalImageResizeMode.Cover,
											}}
											uri={""}
										/>
										<Stack ml={-10}>
											<UniversalImage
												style={{ image: { borderRadius: iconSize } }}
												fallback={
													<Unicon
														address={
															isSameAddress(userAddress, item.admin)
																? "0x765DE816845861e75B25fCA122bb6899B8B1282a"
																: userAddress
														}
														size={iconSize}
													/>
												}
												size={{
													width: iconSize,
													height: iconSize,
													resizeMode: UniversalImageResizeMode.Cover,
												}}
												uri={""}
											/>
										</Stack>
										<YStack ml={2}>
											<Text>+{item.memberCount - 2}</Text>
											<Text variant="body3">others</Text>
										</YStack>
									</XStack>
								</XStack>
								<XStack items="center" mt="$2xs">
									<Text mr="$sm" variant="body3">
										Payout
									</Text>
									<Separator />
								</XStack>
								<XStack justify="space-between" items="center">
									<Text variant="subHeading1">Ksh {item.payoutAmount}</Text>
									<Text variant="body3">
										<Text color="$neutral2" variant="body3">
											Ends:
										</Text>{" "}
										Feb 7, 2026
									</Text>
								</XStack>
							</YStack>
						</TouchableArea>
					))}
				</YStack>
			)}
		</View>
	);
}
