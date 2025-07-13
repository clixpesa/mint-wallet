import { AccountIcon } from "@/components/account/AccountIcon";
import { Screen } from "@/components/layout/Screen";
import {
	ScrollView,
	Separator,
	Stack,
	Text,
	TouchableArea,
	View,
	XStack,
	YStack,
} from "@/ui";
import { PlusCircle, RoscaFill } from "@/ui/components/icons";
import { useEffect, useState } from "react";

export default function SlotsScreen() {
	const spaceInfo = {
		startDate: Date.now(), //is in miliseconds already
		interval: 1814400,
		members: 10,
	};

	const userAddress = "0x765de816845861e75a25fca122bb6898b8b1282a";

	interface MemberSlot {
		slotId: number;
		slotDate: string; //Date;
		slotOwner: Address | null;
	}
	const [slots, setSlots] = useState<MemberSlot[]>([]);
	//console.log(slots);
	const durationMs = spaceInfo.interval * 1000 * (spaceInfo.members - 1);
	const endDate = new Date(spaceInfo.startDate + durationMs);

	const startDate = new Date(spaceInfo.startDate);
	const years = endDate.getFullYear() - startDate.getFullYear();
	const months = endDate.getMonth() - startDate.getMonth();
	const days = endDate.getDate() - startDate.getDate();
	const fractionalMonth = days / 30;
	const monthsDuration = years * 12 + months + fractionalMonth;

	const handleSlotSelection = (id: number) => {
		const index = slots.findIndex((slot) => slot.slotId === id);
		const updatedSlots = [...slots];
		updatedSlots[index] = {
			...updatedSlots[index],
			slotOwner: userAddress,
		};
		setSlots(updatedSlots);
	};

	useEffect(() => {
		const getRoscaSlots = () => {
			const slots: MemberSlot[] = [];
			//const startDate = new Date(spaceInfo.startDate);
			for (let i = 0; i < spaceInfo.members; i++) {
				// Calculate the timestamp for this member's slot
				const slotTimestamp =
					spaceInfo.startDate + i * spaceInfo.interval * 1000;
				const slotDate = new Date(slotTimestamp);
				const fSlotDate = slotDate.toLocaleDateString("en-US", {
					day: "numeric",
					month: "short",
				});
				slots.push({
					slotId: i + 1, // Starting member IDs from 1
					slotDate: fSlotDate,
					slotOwner: null,
				});
			}
			setSlots(slots);
		};
		getRoscaSlots();
	}, []);
	return (
		<Screen title="Slots">
			<YStack self="baseline" mx="$lg" mt="$lg" width="90%" gap="$sm">
				<XStack items="center" gap="$sm">
					<Stack
						bg="$accent2"
						height={46}
						rounded="$md"
						width={46}
						items="center"
						justify="center"
					>
						<RoscaFill size={28} color="$accent1" />
					</Stack>
					<YStack gap="$2xs">
						<Text variant="body3" color="$neutral2">
							Circle Value
						</Text>
						<Text variant="subHeading1">Ksh 100000</Text>
					</YStack>
				</XStack>
				<XStack justify="space-between">
					<YStack gap="$2xs">
						<Text variant="body3" color="$neutral2">
							Pay
						</Text>
						<Text variant="subHeading2">Ksh 2500</Text>
					</YStack>
					<YStack gap="$2xs">
						<Text variant="body3" color="$neutral2">
							Duration
						</Text>
						<Text variant="subHeading2">
							{monthsDuration.toFixed(0)} Months
						</Text>
					</YStack>
					<YStack gap="$2xs">
						<Text variant="body3" color="$neutral2">
							Start
						</Text>
						<Text variant="subHeading2">
							{startDate.toLocaleDateString("en-US", {
								day: "numeric",
								month: "short",
							})}
						</Text>
					</YStack>
					<YStack gap="$2xs">
						<Text variant="body3" color="$neutral2">
							End
						</Text>
						<Text variant="subHeading2">
							{endDate.toLocaleDateString("en-US", {
								day: "numeric",
								month: "short",
							})}
						</Text>
					</YStack>
				</XStack>
			</YStack>
			<Separator width="90%" mt="$sm" />
			<ScrollView showsVerticalScrollIndicator={false}>
				<View
					flexDirection="row"
					flexWrap="wrap"
					gap="$vs"
					mt="$md"
					mb="$3xl"
					justify="center"
					self="center"
					width="100%"
				>
					{slots
						.filter((slot) => slot.slotOwner)
						.map((slot) => (
							<TouchableArea
								key={slot.slotId}
								onPress={() => handleSlotSelection(slot.slotId)}
							>
								<YStack
									items="center"
									justify="center"
									gap="$2xs"
									width={80}
									height={72}
								>
									<AccountIcon
										address={slot.slotOwner}
										size={32}
										showBorder={true}
										borderWidth={1}
										borderColor="$tealVibrant"
									/>
									<Text variant="body3">{slot.slotDate}</Text>
								</YStack>
							</TouchableArea>
						))}
					{slots
						.filter((slot) => !slot.slotOwner)
						.map((slot) => (
							<TouchableArea
								bg="$surface1"
								key={slot.slotId}
								onPress={() => handleSlotSelection(slot.slotId)}
							>
								<YStack
									items="center"
									justify="center"
									gap="$2xs"
									width={80}
									height={72}
								>
									<PlusCircle size={24} color="$accent1" />
									<Text variant="body3">{slot.slotDate}</Text>
								</YStack>
							</TouchableArea>
						))}
				</View>
			</ScrollView>
		</Screen>
	);
}
