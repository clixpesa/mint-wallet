import type { JSX, PropsWithChildren } from "react";
import { View, type ViewStyle } from "react-native";

export function HiddenFromScreenReaders({
	children,
	style,
}: PropsWithChildren<{
	style?: ViewStyle;
}>): JSX.Element {
	return (
		<View
			accessibilityElementsHidden={true}
			importantForAccessibility="no-hide-descendants"
			style={style}
		>
			{children}
		</View>
	);
}
