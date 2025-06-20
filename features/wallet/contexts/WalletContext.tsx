import {
	type PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import {
	type PublicClient,
	type WalletClient,
	createPublicClient,
	createWalletClient,
	http,
} from "viem";
import { entryPoint07Address } from "viem/account-abstraction";

import { appStorage } from "@/store/storage";
import { getAuth } from "@react-native-firebase/auth";
import { mnemonicToAccount } from "viem/accounts";
import {
	type SmartAccountClient,
	createSmartAccountClient,
} from "../account-abstraction/createSmartAccountClient";
import { toSimpleSmartAccount } from "../account-abstraction/toSimpleSmartAccount";
import { createPimlicoClient } from "../bundler/pimlico";

import { getChainInfo } from "../chains/utils";
import { useEnabledChains } from "../hooks";
import { ChainId, type MnemonicData } from "../types";
import { decryptMnemonic } from "../utils";

export interface WalletContext {
	eoaAccount: WalletClient | null;
	mainAccount: SmartAccountClient | null;
	publicClient: PublicClient | null;
	isInitialized: boolean;
	isLoading: boolean;
	error: Error | null;
	currentChainId: ChainId;
	updateCurrentChainId: (chainId: ChainId) => void;
}

const initialWalletContext: WalletContext = {
	eoaAccount: null,
	mainAccount: null,
	publicClient: null,
	isInitialized: false,
	isLoading: false,
	error: null,
	currentChainId: ChainId.Avalanche, // Default chain ID
	updateCurrentChainId: () => {},
};

export const WalletContext = createContext<WalletContext>(initialWalletContext);

export function WalletContextProvider({
	children,
}: PropsWithChildren): JSX.Element {
	const { chains, defaultChainId } = useEnabledChains();
	const [state, setState] = useState<
		Omit<WalletContext, "isLoading" | "currentChainId" | "updateCurrentChainId">
	>({
		eoaAccount: null,
		mainAccount: null,
		publicClient: null,
		isInitialized: false,
		error: null,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [currentChainId, setCurrentChainId] = useState<ChainId>(defaultChainId);

	const currentChain = useMemo(() => {
		const chainId = chains.find((chain) => chain === currentChainId);
		return chainId ? getChainInfo(chainId) : null;
	}, [currentChainId, chains]);

	const updateCurrentChainId = useCallback((chainId: ChainId) => {
		setCurrentChainId(chainId);
	}, []);

	const getMnemonic = useCallback(async (): Promise<{
		phrase: string;
		path: string;
		locale: string;
	} | null> => {
		const user = getAuth().currentUser;
		if (!user) {
			throw new Error("User not authenticated");
		}
		try {
			const enMnemonicData = (await appStorage.getItem(
				user.uid,
			)) as MnemonicData | null;
			if (!enMnemonicData || !enMnemonicData.enMnemonic) {
				throw new Error("Mnemonic data not found");
			}
			const mnemonicId = await user
				.getIdTokenResult()
				.then((tokenResult) => tokenResult.claims.mnemonicId);
			const keyParams = user.uid + mnemonicId;
			const mnemonic = await decryptMnemonic(
				enMnemonicData.enMnemonic,
				keyParams,
			);
			if (!mnemonic) throw new Error("Failed to decrypt mnemonic");
			return JSON.parse(mnemonic);
		} catch (error) {
			console.error("Error getting mnemonic:", error);
			return null;
		}
	}, []);

	const initializeWallet = useCallback(async () => {
		setIsLoading(true);
		const user = getAuth().currentUser;
		try {
			if (!currentChain || !user) throw new Error("Chain or user not found");
			const mnemonic: { phrase: string; path: string; locale: string } | null =
				await getMnemonic();
			if (!mnemonic) throw new Error("Mnemonic not found");

			const account = mnemonicToAccount(mnemonic.phrase);
			const eoaAccount = createWalletClient({
				chain: currentChain,
				transport: http(currentChain.rpcUrl.http[0]),
				account,
			});

			const publicClient = createPublicClient({
				chain: currentChain,
				transport: http(currentChain.rpcUrls.default.http[0]),
			});

			const pimlicoClient = createPimlicoClient({
				entryPoint: {
					address: entryPoint07Address,
					version: "0.7",
				},
				transport: http(
					`https://api.pimlico.io/v2/${currentChain.id}/rpc?apikey=pim_MsujSudd323K1KGSmMuLCJ`,
				),
			});

			const smartAccount = await toSimpleSmartAccount({
				client: publicClient,
				owner: account,
				entryPoint: {
					address: entryPoint07Address,
					version: "0.7",
				},
			});

			const mainAccount = createSmartAccountClient({
				account: smartAccount,
				chain: currentChain,
				bundlerTransport: http(
					`https://api.pimlico.io/v2/${currentChain.id}/rpc?apikey=pim_MsujSudd323K1KGSmMuLCJ`,
				),
				paymaster: pimlicoClient,
				userOperation: {
					estimateFeesPerGas: async () => {
						return (await pimlicoClient.getUserOperationGasPrice()).fast;
					},
				},
			});

			setState({
				eoaAccount,
				mainAccount,
				publicClient,
				isInitialized: true,
				error: null,
			});
		} catch (error) {
			console.error("Error initializing wallet:", error);
			setState((prev) => ({
				...prev,
				error: error instanceof Error ? error : new Error("Unknown error"),
			}));
		} finally {
			setIsLoading(false);
		}
	}, [currentChain, getMnemonic]);

	useEffect(() => {
		if (currentChain) {
			initializeWallet();
		}
	}, [currentChain, initializeWallet]);

	const value = useMemo<WalletContext>(
		() => ({
			...state,
			isLoading,
			currentChainId,
			updateCurrentChainId,
		}),
		[state, isLoading, currentChainId, updateCurrentChainId],
	);

	return (
		<WalletContext.Provider value={value}>{children}</WalletContext.Provider>
	);
}

export function useWalletContext(): WalletContext {
	const context = useContext(WalletContext);
	if (!context) {
		throw new Error(
			"useWalletContext must be used within a WalletContextProvider",
		);
	}
	return context;
}
