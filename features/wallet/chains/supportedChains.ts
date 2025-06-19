import {
	avalanche,
	avalancheFuji,
	base,
	baseSepolia,
	celo,
	celoAlfajores,
	mainnet,
	sepolia,
} from "viem/chains";
import { ChainId, type ChainInfo } from "../types";

export const supportedChains: Record<ChainId, ChainInfo> = {
	[ChainId.Mainnet]: {
		...mainnet,
		id: ChainId.Mainnet,
		name: "Ethereum Mainnet",
		rpcUrl: { http: ["https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"] },
		explorer: {
			name: "Etherscan",
			url: "https://etherscan.io/",
			apiUrl: "https://api.etherscan.io/api",
		},
		logo: require("@/ui/assets/images/network-logos/ethereum-logo.png"),
	},
	[ChainId.Avalanche]: {
		...avalanche,
		id: ChainId.Avalanche,
		name: "Avalanche",
		rpcUrl: { http: ["https://api.avax.network/ext/bc/C/rpc"] },
		explorer: {
			name: "SnowTrace",
			url: "https://snowtrace.io/",
			apiUrl: "https://api.snowtrace.io/api",
		},
		logo: require("@/ui/assets/images/network-logos/avalanche-logo.png"),
	},
	[ChainId.Base]: {
		...base,
		id: ChainId.Base,
		name: "Base",
		rpcUrl: { http: ["https://base.org/rpc"] },
		explorer: {
			name: "Base Explorer",
			url: "https://base.org/explorer/",
			apiUrl: "https://base.org/api",
		},
		logo: require("@/ui/assets/images/network-logos/base-logo.png"),
	},
	[ChainId.Celo]: {
		...celo,
		id: ChainId.Celo,
		name: "Celo",
		rpcUrl: { http: ["https://forno.celo.org"] },
		explorer: {
			name: "Celo Explorer",
			url: "https://explorer.celo.org/",
			apiUrl: "https://explorer.celo.org/api",
		},
		logo: require("@/ui/assets/images/network-logos/celo-logo.png"),
	},
	[ChainId.Alfajores]: {
		...celoAlfajores,
		id: ChainId.Alfajores,
		name: "Celo Alfajores",
		rpcUrl: { http: ["https://alfajores-forno.celo.org"] },
		explorer: {
			name: "Celo Alfajores Explorer",
			url: "https://explorer.alfajores.celo.org/",
			apiUrl: "https://explorer.alfajores.celo.org/api",
		},
		logo: require("@/ui/assets/images/network-logos/celo-logo.png"),
	},
	[ChainId.AvalancheFuji]: {
		...avalancheFuji,
		id: ChainId.AvalancheFuji,
		name: "Avalanche Fuji",
		rpcUrl: { http: ["https://api.avax.network/ext/bc/C/rpc"] },
		explorer: {
			name: "SnowTrace",
			url: "https://snowtrace.io/",
			apiUrl: "https://api.snowtrace.io/api",
		},
		logo: require("@/ui/assets/images/network-logos/avalanche-logo.png"),
	},
	[ChainId.BaseSepolia]: {
		...baseSepolia,
		id: ChainId.BaseSepolia,
		name: "Base Sepolia",
		rpcUrl: { http: ["https://sepolia.base.org/rpc"] },
		explorer: {
			name: "Base Sepolia Explorer",
			url: "https://sepolia.base.org/explorer/",
			apiUrl: "https://sepolia.base.org/api",
		},
		logo: require("@/ui/assets/images/network-logos/base-logo.png"),
	},
	[ChainId.Sepolia]: {
		...sepolia,
		id: ChainId.Sepolia,
		name: "Sepolia",
		rpcUrl: { http: ["https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"] },
		explorer: {
			name: "Sepolia Etherscan",
			url: "https://sepolia.etherscan.io/",
			apiUrl: "https://api-sepolia.etherscan.io/api",
		},
		logo: require("@/ui/assets/images/network-logos/ethereum-logo.png"),
	},
};
