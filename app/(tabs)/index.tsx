import { Text } from "@/ui/components/text/Text";
import { StyleSheet } from "react-native";
import { Text as BaseText, View } from "tamagui";

export default function HomeScreen() {
	return (
		<View flex={1} content="center" items="center">
			<BaseText>Testing UI</BaseText>
			<Text variant="heading2">This Guy</Text>

			<Text variant="heading3">This Guy</Text>

			<Text variant="subHeading1">This Guy</Text>
			<Text variant="body1">This Guy</Text>
			<Text variant="body2">This Guy</Text>
			<Text variant="body3">This Guy</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
