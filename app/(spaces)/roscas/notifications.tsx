import { AccountIcon } from "@/components/account/AccountIcon";
import { Screen } from "@/components/layout/Screen";
import { Button, Stack, Text, XStack, YStack } from "@/ui";
import { PapersText } from "@/ui/components/icons";
import {
	arrayRemove,
	doc,
	getDoc,
	getFirestore,
	updateDoc,
} from "@react-native-firebase/firestore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function GroupNotifications() {
	const params = useLocalSearchParams();
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		(async () => {
			const roscaDoc = await getDoc(
				doc(getFirestore(), "SPACES", params.spaceId as string),
			);
			if (roscaDoc.exists()) {
				const spaceData = roscaDoc.data();
				const requests = spaceData?.requests || [];

				if (requests.length > 0) {
					const userPromises = requests.map((ref) => getDoc(ref));

					const userSnapshots = await Promise.all(userPromises);
					const usersData = userSnapshots.map((snap) => {
						const user = snap.data();
						return {
							id: user.uid,
							address: user.customClaims.evmAddr,
							tag: user.customClaims.tag,
							name: user.displayName,
						};
					});
					setRequests(usersData);
				}
			}
		})();
	}, []);

	const onPressReject = async (id: string) => {
		try {
			console.log(id);
			const spaceRef = doc(getFirestore(), "SPACES", params.spaceId as string);
			const userRef = doc(getFirestore(), "USERS", id);

			await updateDoc(spaceRef, {
				requests: arrayRemove(userRef),
			});
			const indexOfId = requests.findIndex((request) => request.id === id);
			const nReqs = requests.splice(indexOfId, 1);
			setRequests(nReqs);
			console.log(`User ${id} removed from requests`);
		} catch (error) {
			console.error("Error removing request:", error);
		}
	};
	return (
		<Screen title="Notifications">
			{requests.length > 0 ? (
				requests.map((request) => (
					<XStack
						key={request.id}
						mt="$sm"
						gap="$md"
						self="flex-start"
						mx="$xl"
					>
						<AccountIcon size={52} address={request.address} />
						<YStack gap="$xs">
							<YStack>
								<Text>{request.name ?? `@${request.tag}`}</Text>
								<Text variant="body3" color="$neutral2">
									has requested to join the chama
								</Text>
							</YStack>
							<XStack gap="$md">
								<Button size="sm" variant="branded">
									Accept
								</Button>
								<Button
									size="sm"
									variant="branded"
									emphasis="secondary"
									onPress={() => onPressReject(request.id)}
								>
									Reject
								</Button>
							</XStack>
						</YStack>
					</XStack>
				))
			) : (
				<XStack
					items="center"
					gap="$lg"
					rounded="$lg"
					bg="$surface2"
					width="92%"
					p="$sm"
					mt="$xl"
				>
					<Stack
						bg="$neutral3"
						height={48}
						rounded="$full"
						width={48}
						items="center"
						justify="center"
					>
						<PapersText size={30} color="$surface1" />
					</Stack>
					<Text variant="subHeading1" color="$neutral2">
						No notifications yet
					</Text>
				</XStack>
			)}
		</Screen>
	);
}
