import { Stack, XStack } from "tamagui";
import { Text } from "../text";

interface TransactionLoaderProps {
	opacity: number;
}

export const TXN_HISTORY_LOADER_ICON_SIZE = "$4xl";

export function TransactionLoader({
	opacity,
}: TransactionLoaderProps): JSX.Element {
	return (
		<Stack opacity={opacity} overflow="hidden" className="TransactionLoader">
			<XStack items="flex-start" gap="$lg" content="space-between" py="$md">
				<XStack items="center" gap="$md" height="100%" content="flex-start">
					<Stack
						items="center"
						content="center"
						bg="$secondary"
						rounded="$full"
						height={TXN_HISTORY_LOADER_ICON_SIZE}
						width={TXN_HISTORY_LOADER_ICON_SIZE}
					/>
					<Stack>
						<XStack items="center" gap="$xs">
							<Text
								loading
								loadingPlaceholderText="Contract Interaction"
								numberOfLines={1}
								variant="body1"
							/>
						</XStack>
						<Text
							loading
							color="$secondary"
							loadingPlaceholderText="Caption Text"
							numberOfLines={1}
							variant="subHeading2"
						/>
					</Stack>
				</XStack>
			</XStack>
		</Stack>
	);
}
