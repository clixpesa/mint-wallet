import type { Chain } from "viem";

export enum ChainId {
	Mainnet = 1,
	Avalanche = 43114,
	Base = 8453,
	Celo = 42220,
	Alfajores = 44787,
	AvalancheFuji = 43113,
	BaseSepolia = 84532,
	Sepolia = 11155111,
}

export interface ChainInfo extends Chain {
	readonly id: ChainId;
	readonly name: string;
	readonly rpcUrl: { http: string[] };
	readonly explorer: { name: string; url: `${string}/`; apiUrl?: string };
	readonly logo: string;
}
