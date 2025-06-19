import { useAppState } from "@/features/essentials/appState";
import { getEnabledChains } from "./chains/utils";
import { ChainId, type EnabledChainsInfo } from "./types";

export function useEnabledChains(): EnabledChainsInfo {
	const isTestnet = useAppState((state) => state.testnetEnabled);
	const chainIds = getEnabledChains(isTestnet);

	return {
		chains: chainIds,
		isTestnet: Boolean(isTestnet),
		defaultChain: isTestnet ? ChainId.AvalancheFuji : ChainId.Avalanche,
	};
}
