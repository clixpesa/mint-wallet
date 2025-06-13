import type { ChainId, ChainInfo } from "../types";
import { supportedChains } from "./supportedChains";

export function getChainInfo(chainId: ChainId): ChainInfo {
	return supportedChains[chainId];
}

export function getChainName(chainId: ChainId): string {
	return getChainInfo(chainId).name;
}

export function isTestnet(chainId: ChainId): boolean {
	return Boolean(supportedChains[chainId]?.testnet);
}
