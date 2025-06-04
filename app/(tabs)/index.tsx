import { Text, View, XStack } from "@/ui";
import { HomeLine } from "@/ui/components/icons/HomeLine";
import { InvestLine } from "@/ui/components/icons/InvestLine";
import { PantoneLine } from "@/ui/components/icons/PantoneLine";
import { WalletLine } from "@/ui/components/icons/WalletLine";

export default function HomeScreen() {
	return (  
		<View flex={1} justify="center" items="center" bg="$surface1">
			<Text>Home Page</Text>
			<XStack>
				<PantoneLine color="$neutral1" size={40} />
				<HomeLine color="$neutral1" size={40} />
				<InvestLine color="$neutral1" size={40} />
				<WalletLine color="$neutral1" size={40} />
			</XStack>
		</View>
	);
}
