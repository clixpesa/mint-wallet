import { Text, View } from "@/ui";

export default function SendScreen() {
  return (  
    <View flex={1} items="center" bg="$surface1" justify="center">
        <Text>Send Cash</Text>
        <Text color="$neutral2">Send to phone, email, address or clixtag</Text>
    </View>
  );
}
