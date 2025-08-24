import { ParallaxScrollView } from "@/components/layout/ParallaxScrollView";
import { SpacesCard, SpacesHeader, SpacesTabs } from "@/features/spaces";
import { useState } from "react";
//import { useNavigationState } from "@react-navigation/native";

export default function SpacesScreen() {
	//const index = useNavigationState((s) => s.routes[s.index].state?.index) || 0
	const [index, setIndex] = useState<number>(0);
	return (
		<ParallaxScrollView
			header={<SpacesHeader index={index} />}
			headerContent={<SpacesCard index={index} />}
		>
			<SpacesTabs onTabSelect={({ index }) => setIndex(index)} />
		</ParallaxScrollView>
	);
}

/*<>
  <IconSymbol
						size={310}
						color="#d4d4d4"
						name="chevron.left.forwardslash.chevron.right"
						style={styles.headerImage}
					/>
					<Text
						self="center"
						t={106}
						variant="heading2"
						fontWeight="700"
						color="$neutral2"
					>
						Coming Soon
					</Text>
				</>
				
		
const styles = StyleSheet.create({
	headerImage: {
		color: "#d4d4d4",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
});
*/
