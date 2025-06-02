import { Button } from "@/ui/components/buttons/Button/Button";
import { PlusMinusButton, PlusMinusButtonType } from "@/ui/components/buttons/IconButton/PlusMinusButton";
import { Text } from "@/ui/components/text/Text";
import { StyleSheet } from "react-native";
import { Text as BaseText, View } from "tamagui";


export default function HomeScreen() {
	return (
		<View flex={1} content="center" items="center">
			<BaseText>Testing UI</BaseText>
			<Text variant="heading3">This Guy</Text>
			<Button   size="lg" loading width="85%">This Button</Button>
			<PlusMinusButton type={PlusMinusButtonType.Minus} onPress={()=>{}} disabled={false} />
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
