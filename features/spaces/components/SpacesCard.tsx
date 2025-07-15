import {
	ScrollView,
	Stack,
	Text,
	Unicon,
	UniversalImage,
	UniversalImageResizeMode,
	XStack,
	YStack,
} from "@/ui";
import { router } from "expo-router";

export const SpacesCard = ({ index }: { index: number }) => {
	const iconSize = index === 0 ? 60 : 42;
	const totalBalUSD = 1000;
	const titles = ["Saving Goals", "Groups"];
	return (
		<YStack width="100%" mt="$sm" gap="$sm">
			<Text color="$neutral2" mx="$sm">{`Popular ${titles[index]}`}</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<XStack gap="$sm" mx="$sm">
					{index === 0
						? PopularSavings.map((item) => (
								<YStack
									key={item.id}
									bg="$surface1"
									width="auto"
									p="$sm"
									gap="$vs"
									rounded="$md"
									onPress={() =>
										router.navigate({
											pathname: "/(spaces)/savings/customize",
											params: {
												name: item.name,
												amount: item.amount[0],
											},
										})
									}
								>
									<UniversalImage
										style={{ image: { borderRadius: iconSize } }}
										fallback={
											<Unicon
												address="0x765DE816845861e75B25fCA122bb6898B8B1282a"
												size={iconSize}
											/>
										}
										size={{
											width: iconSize,
											height: iconSize,
											resizeMode: UniversalImageResizeMode.Cover,
										}}
										uri={item.icon}
									/>
									<Stack>
										<Text variant="subHeading2" color="$neutral1">
											{item.name}
										</Text>
										<Text variant="body3" color="$neutral2">
											{item.savers}+ savers
										</Text>
									</Stack>
									<Text variant="subHeading2" color="$accent1">
										${item.amount[0].toFixed(2)}
										<Text variant="body4" color="$neutral2">
											{" "}
											to $
											{item.amount[1] >= 10000
												? `${item.amount[1] / 1000}k`
												: item.amount[1]}
										</Text>
									</Text>
								</YStack>
							))
						: PopularGroups.map((item) => (
								<YStack
									key={item.id}
									bg="$surface1"
									width="auto"
									p="$sm"
									gap="$vs"
									rounded="$md"
									onPress={() => {
										const { target, ...rest } = item;
										router.navigate({
											pathname: "/(spaces)/roscas/overview",
											params: {
												...rest,
												...target,
											},
										});
									}}
								>
									<XStack>
										<UniversalImage
											style={{ image: { borderRadius: iconSize } }}
											fallback={
												<Unicon address={item.ownerAddress} size={iconSize} />
											}
											size={{
												width: iconSize,
												height: iconSize,
												resizeMode: UniversalImageResizeMode.Cover,
											}}
											uri={item.ownerIcon}
										/>
										<Stack
											ml={-8}
											rounded="$full"
											bg="$neutral3"
											width={iconSize}
											justify="center"
											items="center"
										>
											<Text color="$surface1" variant="body3">
												+{item.members - 1}
											</Text>
										</Stack>
									</XStack>
									<YStack gap="$3xs">
										<Text variant="subHeading2" color="$neutral1">
											{item.name}
										</Text>
										<Text variant="body3" color="$neutral2">
											{item.members} members
										</Text>
									</YStack>
									<Stack>
										<Text
											variant="subHeading2"
											color="$accent1"
										>{`${item.target.currency === "USD" ? "$" : "Ksh "}${item.target.amount}`}</Text>
										<Text variant="body4" color="$neutral2">
											Ends on {item.endDate}
										</Text>
									</Stack>
								</YStack>
							))}
				</XStack>
			</ScrollView>
		</YStack>
	);
};

const PopularSavings = [
	{
		id: "0x0001",
		name: "Holiday Trip",
		icon: require("@/ui/assets/images/popular-icons/airplane.png"),
		savers: 300,
		amount: [200, 1000],
	},
	{
		id: "0x0002",
		name: "Buy a Plot",
		icon: require("@/ui/assets/images/popular-icons/property.png"),
		savers: 637,
		amount: [6500, 10000],
	},
	{
		id: "0x0003",
		name: "Education",
		icon: require("@/ui/assets/images/popular-icons/education.png"),
		savers: 2300,
		amount: [650, 5000],
	},
	{
		id: "0x0004",
		name: "Buy a Car",
		icon: require("@/ui/assets/images/popular-icons/car.png"),
		savers: 100,
		amount: [6500, 25000],
	},
	{
		id: "0x0005",
		name: "Property",
		icon: require("@/ui/assets/images/popular-icons/real-estate.png"),
		savers: 150,
		amount: [12000, 50000],
	},
	{
		id: "0x0006",
		name: "Trucking Biz",
		icon: require("@/ui/assets/images/popular-icons/truck.png"),
		savers: 100,
		amount: [10000, 50000],
	},
];

const PopularGroups = [
	{
		id: "0x1001",
		name: "Wahenga",
		ownerAddress: "0x765DE816845861e75B25fCA122bb6898B8B1282a",
		ownerIcon: "",
		members: 100,
		target: {
			amount: 1000,
			currency: "USD",
		},
		endDate: "Feb 7, 2026",
		type: "challenge",
	},
	{
		id: "0x1002",
		name: "Superstars",
		ownerAddress: "0x765DE816845861e75B25fCA122bb6899B8B1282a",
		ownerIcon: "",
		members: 26,
		target: {
			amount: 100000,
			currency: "KES",
		},
		endDate: "Oct 31, 2025",
		type: "rosca",
	},
	{
		id: "0x1003",
		name: "FUTURE",
		ownerAddress: "0x765DE816845861e75c25fCA122bb6899B8B1282a",
		ownerIcon: require("@/ui/assets/images/popular-icons/user-96.png"),
		members: 27,
		target: {
			amount: 5000,
			currency: "USD",
		},
		endDate: "June 31, 2026",
		type: "challenge",
	},
	{
		id: "0x1004",
		name: "Women of Grace",
		ownerAddress: "0x765DE816846861e75B25fCA122bb6899B8B1282a",
		ownerIcon: "",
		members: 12,
		target: {
			amount: 10000,
			currency: "KES",
		},
		endDate: "Dec 31, 2026",
		type: "rosca",
	},
	{
		id: "0x1005",
		name: "A dollar a day",
		ownerAddress: "0x765DE916845861e75B25fCA122bb6899B8B1282a",
		ownerIcon: require("@/ui/assets/images/popular-icons/user.png"),
		members: 30,
		target: {
			amount: 365,
			currency: "USD",
		},
		endDate: "June 31, 2026",
		type: "challenge",
	},
	{
		id: "0x0006",
		name: "Dream Chasers",
		ownerAddress: "0x905DE816845861e75B25fCA122bb6899B8B1282a",
		ownerIcon: "",
		members: 15,
		target: {
			amount: 10000,
			currency: "USD",
		},
		endDate: "Dec 31, 2026",
		type: "rosca",
	},
];
