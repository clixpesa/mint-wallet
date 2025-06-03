import { ActivityLoader, Button, PlusMinusButton, PlusMinusButtonType, Text, View } from "@/ui";
import { TokenLoader } from "@/ui/components/loading/TokenLoader";
import { useState } from "react";
import { StyleSheet } from "react-native";


export default function HomeScreen() {
	const [loading, setLoading] = useState(false);
	return (  
		<View flex={1} content="center" items="center">
			<Text>Testing UI</Text>
			<Text variant="heading3">This Guy</Text>
			<Button  variant="branded" size="lg"  width="85%" loading={loading} >This Button</Button>
			<ActivityLoader opacity={1}/>
			<TokenLoader opacity={1}/>
			<PlusMinusButton type={PlusMinusButtonType.Minus} onPress={()=>setLoading(!loading)} disabled={false} />
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
