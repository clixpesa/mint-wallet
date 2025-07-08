import { Button, Spacer, Stack, Text, View, XStack, YStack } from "@/ui";
import { MoneyFill, SafeFill } from "@/ui/components/icons";
import { Link, router } from "expo-router";
import { Spaces as SpacesList } from "../components/Spaces";

export function SavingsLanding() {
	interface Space {
		id: number;
		name: string;
		amount: number;
	}

	const spaces: Space[] = [
		{ id: 1, name: "Dream Vacation", amount: 12500.0 },
		{ id: 2, name: "Emergency Fund", amount: 25000.0 },
		{ id: 3, name: "New MacBook Pro", amount: 45000.0 },
		{ id: 4, name: "Home Savings", amount: 150000.0 },
	];
	return (
		<View flex={1} items="center" bg="$surface1" py="$3xl">
			{spaces.length === 0 ? (
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
								<SafeFill size={28} color="$surface1" />
							</Stack>
							<Stack width="83%">
								<Text variant="subHeading2">
									Get paid daily on your savings
								</Text>
								<Text variant="body3" color="$neutral2">
									Start saving today and put your cash to work. Earn upto 8.84%
									APY.
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
								<MoneyFill size={28} color="$surface1" />
							</Stack>
							<Stack width="83%">
								<Text variant="subHeading2">Access your money anytime</Text>
								<Text variant="body3" color="$neutral2">
									Withdraw your money anytime with no notice period.
								</Text>
							</Stack>
						</XStack>
					</YStack>
					<Spacer height="20%" />
					<Button
						variant="branded"
						size="lg"
						width="85%"
						onPress={() => router.navigate("/(spaces)/savings/create")}
					>
						Get started
					</Button>
				</>
			) : (
				<SpacesList>
					<SpacesList.Items>
						<SpacesList.Group>
							{spaces.map((space) => (
								<Link
									href={{
										pathname: "/(spaces)/savings/[spaceId]",
										params: {
											spaceId: space.id,
											name: space.name,
											amount: space.amount,
										},
									}}
									push
									asChild
									key={space.id}
								>
									<SpacesList.Item
										key={space.id}
										rightLabel={`Kshs ${space.amount.toLocaleString()}`}
									>
										{space.name}
									</SpacesList.Item>
								</Link>
							))}
						</SpacesList.Group>
					</SpacesList.Items>
				</SpacesList>
			)}
		</View>
	);
}
