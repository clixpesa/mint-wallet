import { useAppState } from "@/features/essentials/appState";
import { Button, Text, View } from "@/ui";
import { useDispatch } from "react-redux";

export default function HomeScreen() {
	const dispatch = useDispatch()
	const setIsUnlocked = useAppState((s) => s.setIsUnlocked)
	return (  
		<View flex={1} justify="center" items="center" bg="$surface1">
			<Text>Home Page</Text>
			
			<Button onPress={() => setIsUnlocked(false) } variant="branded">Trigger Effect</Button>
		</View>
	);
}
