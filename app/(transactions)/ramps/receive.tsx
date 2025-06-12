import { Text, View } from "@/ui";

export default function ReciveScreen() {
  return (  
    <View flex={1} items="center" bg="$surface1" justify="center">
        <Text>Recieve Cash</Text>
        <Text color="$neutral2">Share you address or have the QRCode scanned</Text>
    </View>
  );
}
