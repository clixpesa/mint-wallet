```Js
import { useAppState } from "@/features/essentials/appState";
import { ExtrasHeader } from "@/features/extras";
import { LinearGradient, Text, View } from "@/ui";
import { useDispatch } from "react-redux";

export default function ExtrasScreen() {
	const dispatch = useDispatch()
	const setIsUnlocked = useAppState((s) => s.setIsUnlocked)
	

	return (  
		<View flex={1} items="center" bg="$surface1">
			<LinearGradient width="100%" height="100%" colors={["$surface1", "$surface3"]} position="absolute"/>
				<ExtrasHeader />
				<Text>Extra Page</Text>
				<Text color="$neutral2">Discover popular and latest dapps</Text>
		</View>
	);
}


const checkTransfers = async () => {
				const logs = await publicClient?.getLogs({
					address: "0x1E0433C1769271ECcF4CFF9FDdD515eefE6CdF92",
					event: parseAbiItem("event Transfer(address,address,uint256)"),
					args: { to: mainAccount?.account?.address },
					fromBlock: await publicClient.getBlockNumber(), // or specific block number
				});
				console.log("Found transfers:", logs);
				if (logs.length > 0) {
					if (pollingInterval.current) {
						clearInterval(pollingInterval.current);
						pollingInterval.current = null;
					}
					console.log(logs);
				}
			};

			// Call periodically
			pollingInterval.current = setInterval(checkTransfers, 1000);
```
