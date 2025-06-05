import { setEncryptedItem } from "@/store/effects";
import { Button, Text, View } from "@/ui";
import { useDispatch } from "react-redux";

export default function HomeScreen() {
	const dispatch = useDispatch()
	return (  
		<View flex={1} justify="center" items="center" bg="$surface1">
			<Text>Home Page</Text>
			
			<Button onPress={() => dispatch(setEncryptedItem({key: "NewItem", value: {address: "OxDeadedBead", name: "TheBond", id: 22}})) } variant="branded">Trigger Effect</Button>
		</View>
	);
}
