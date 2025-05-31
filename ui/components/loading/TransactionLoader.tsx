import type { JSX } from "react";
import { Stack, XStack, YStack, isWeb } from "tamagui";
import { Text } from "../text";
import { Skeleton } from "./Skeleton";

interface TxLoaderProps {
	opacity: number;
	withAmounts?: boolean;
}

export function TokenLoader({
	opacity,
	withAmounts = false,
}: TxLoaderProps): JSX.Element {
	return (
		<XStack items="center" content="space-between" opacity={opacity} py="$sm">
			<XStack items="center" gap="$md" overflow="hidden">
				<Skeleton>
					<Stack bg="$gray5" rounded="$full" height="$3xl" width="$3xl" />
				</Skeleton>

				<YStack items="flex-start">
					<Text
						loading="no-shimmer"
						loadingPlaceholderText="Transaction Name"
						numberOfLines={1}
						variant={isWeb ? "body3" : "body1"}
					/>
					<XStack items="center" gap="$sm" minH={20}>
						<Text
							loading="no-shimmer"
							loadingPlaceholderText="Wed, 1:30 PM"
							numberOfLines={1}
							variant={isWeb ? "body3" : "body2"}
						/>
					</XStack>
				</YStack>

				{withAmounts && (
					<YStack items="flex-end">
						<Text
							loading="no-shimmer"
							loadingPlaceholderText="$XX.XX"
							numberOfLines={1}
							variant="body1"
						/>
						<XStack items="center" gap="$sm" minH={20}>
							<Text
								loading="no-shimmer"
								loadingPlaceholderText="~XX.XX"
								numberOfLines={1}
								variant="subHeading2"
							/>
						</XStack>
					</YStack>
				)}
			</XStack>
		</XStack>
	);
}
