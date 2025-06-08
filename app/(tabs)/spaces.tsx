import { StyleSheet } from "react-native";

import { ParallaxScrollView } from "@/components/layout/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { SpacesHeader } from "@/features/essentials";
import { Text } from "@/ui";

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
    <Text>Spaces Home</Text>
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
