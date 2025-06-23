import { useAppState } from "@/features/essentials/appState";
import { getEnabledChains } from "./chains/utils";
import { getEnabledTokens } from "./tokens/utils";
import {
	ChainId,
	type EnabledChainsInfo,
	type TokenWithBalance,
} from "./types";

export function useEnabledChains(): EnabledChainsInfo {
	const isTestnet = useAppState((state) => state.testnetEnabled);
	const chainIds = getEnabledChains(isTestnet);
	/*const chains = chainIds.map((chainId) => {
		const chainInfo = getChainInfo(chainId);
		return {
			...chainInfo,
		};
	});*/

	return {
		chains: chainIds,
		isTestnet: Boolean(isTestnet),
		defaultChainId: isTestnet ? ChainId.AvalancheFuji : ChainId.Avalanche,
	};
}

export function useEnabledTokens(): TokenWithBalance[] {
	const { chains } = useEnabledChains();
	const tokens = getEnabledTokens(chains);
	return tokens.map((token) => ({
		...token,
		balance: 0, // Placeholder for balance, should be fetched from a service
		balanceUSD: 0, // Placeholder for USD value, should be fetched from a service
	}));
}
