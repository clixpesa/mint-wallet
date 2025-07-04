import { useAppState } from "@/features/essentials/appState";
import { ExtrasHeader } from "@/features/extras";
import { LinearGradient, Text, View } from "@/ui";
import { useDispatch } from "react-redux";

export default function AccountScreen() {
	const dispatch = useDispatch();
	const setIsUnlocked = useAppState((s) => s.setIsUnlocked);

	return (
		<View flex={1} items="center" bg="$surface1">
			<LinearGradient
				width="100%"
				height="100%"
				colors={["$surface1", "$surface3"]}
				position="absolute"
			/>
			<ExtrasHeader />
			<Text>Account Page</Text>
			<Text color="$neutral2">Discover popular and latest dapps</Text>
		</View>
	);
}
