import { Text, TouchableArea } from "@/ui";
import { RotatableChevron } from "@/ui/components/icons";
import { tokens } from "@/ui/theme/tokens";
import { BackButton } from "./BackButton";

export const HeaderBackButton = (): JSX.Element => (
	<BackButton color="$neutral2" size={tokens.icon.sm.val} />
);

export const HeaderBackImage = (): JSX.Element => (
	<RotatableChevron
		color="$neutral2"
		height={tokens.icon.sm.val}
		width={tokens.icon.sm.val}
	/>
);

export const HeaderSkipButton = ({
	onPress,
}: { onPress: () => void }): JSX.Element => {
	return (
		<TouchableArea onPress={() => onPress()}>
			<Text color="$neutral2" variant="buttonLabel2">
				Skip
			</Text>
		</TouchableArea>
	);
};

export const HeaderNextButton = ({
	onPress,
}: { onPress: () => void }): JSX.Element => {
	return (
		<TouchableArea onPress={() => onPress()}>
			<Text color="$neutral2" variant="buttonLabel2">
				Next
			</Text>
		</TouchableArea>
	);
};
