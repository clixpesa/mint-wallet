import { AccountIcon } from "@/components/account/AccountIcon";
import { Button, Spacer, Stack, Text, View, XStack, YStack } from "@/ui";
import { MoneyFill, SafeFill } from "@/ui/components/icons";
import { router } from "expo-router";
import { Progress } from "tamagui";

export function SavingsLanding() {
	interface Space {
		id: number;
		name: string;
		deadline: number;
		amount: {
			saved: number;
			target: number;
			earned: number;
		};
	}

	const spaces: Space[] = [
		{
			id: 1,
			name: "Dream Vacation",
			deadline: 1752073111,
			amount: { saved: 1500, target: 25000, earned: 100 },
		},
		{
			id: 2,
			name: "Emergency Fund",
			deadline: 1752073111,
			amount: { saved: 1500, target: 25000, earned: 100 },
		},
		{
			id: 3,
			name: "New MacBook Pro",
			deadline: 1752073111,
			amount: { saved: 1500, target: 25000, earned: 100 },
		},
		{
			id: 4,
			name: "Home Savings",
			deadline: 1752073111,
			amount: { saved: 1500, target: 25000, earned: 100 },
		},
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
				<YStack gap="$vs" width="92%">
					{spaces.map((item) => (
						<YStack
							borderWidth={1}
							borderBottomWidth={3}
							borderColor="$surface3"
							p="$md"
							rounded="$lg"
							gap="$vs"
							key={item.id}
						>
							<XStack items="center" gap="$lg">
								<AccountIcon
									size={42}
									address="0x765DE816845861e75A25fCA122bb6898B8B1282e"
								/>
								<YStack gap="$2xs">
									<Text variant="subHeading2">{item.name}</Text>
									<Text variant="body3" color="$neutral2">
										Weekly saving: $500
									</Text>
								</YStack>
							</XStack>
							<YStack gap="$vs">
								<XStack justify="space-between">
									<Text variant="body3" fontWeight="$md">
										${item.amount.saved.toFixed(2)}
									</Text>
									<Text color="$neutral2" variant="body3">
										Target: ${item.amount.target.toFixed(2)}
									</Text>
								</XStack>
								<Progress value={60} height="$xs" bg="$tealThemed">
									<Progress.Indicator
										bg="$tealBase"
										animation="80ms-ease-in-out"
									/>
								</Progress>
							</YStack>
						</YStack>
					))}
				</YStack>
			)}
		</View>
	);
}
