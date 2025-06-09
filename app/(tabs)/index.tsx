import { HomeCard, HomeHeader } from "@/features/essentials";
import { useAppState } from "@/features/essentials/appState";
import { LinearGradient, View } from "@/ui";
import { useDispatch } from "react-redux";

export default function HomeScreen() {
	const dispatch = useDispatch()
	const setIsUnlocked = useAppState((s) => s.setIsUnlocked)
	

	return (  
		<View flex={1} items="center" bg="$surface1">
			<LinearGradient width="100%" height="100%" colors={["$surface1", "$surface3"]} position="absolute"/>
				<HomeHeader />
				<HomeCard />
		</View>
	);
}
