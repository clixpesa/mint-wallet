import { ParallaxScrollView } from "@/components/layout/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { SpacesHeader, SpacesTabs } from "@/features/spaces";
import { StyleSheet } from "react-native";


export default function SpacesScreen() {
  return (
    <ParallaxScrollView
      header={<SpacesHeader/>}
      headerContent={
        <IconSymbol
          size={310}
          color= "#d4d4d4"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
     <SpacesTabs />
    </ParallaxScrollView>
  );
}

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
