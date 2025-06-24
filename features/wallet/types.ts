import type { Chain } from "viem";

export enum Currency {
	USD = "USD",
	EUR = "EUR",
	GBP = "GBP",
	KES = "KES",
	UGX = "UGX",
	TZS = "TZS",
}

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

export interface EnabledChainsInfo {
	chains: ChainId[]; //ChainInfo[];
	isTestnet: boolean;
	defaultChainId: ChainId;
}

export type Address = `0x${string}`; // Ethereum-style address format

export type MnemonicData = {
	address: string;
	mnemonic?: { phrase: string; path: string; locale: string } | string | null;
	enMnemonic?: string;
};

export type Balance = {
	balance: number;
	balanceUSD: number;
};

export type TokenType = "Dollar" | "Local" | "Native" | "Other";
export type TokenId = `${string}_${ChainId}`; // e.g., "USDC_1" for USDC on Ethereum Mainnet

export type Token = {
	chainId: ChainId;
	address: Address;
	name: string;
	symbol: string;
	decimals: number;
	logo: string; // Optional logo URL
	isNative?: boolean; // Indicates if it's a native token (e.g., ETH, AVAX)
};

export type TokenWithBalance = Token &
	Balance & {
		type?: TokenType; // Optional type for categorization
	};
