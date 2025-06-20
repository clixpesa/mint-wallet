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
	http,
	type HDAccount,
	type PublicClient,
	type WalletClient,
	createPublicClient,
	createWalletClient,
} from "viem";
import {
	entryPoint07Address,
} from "viem/account-abstraction";

import { appStorage } from "@/store/storage";
import { getAuth } from "@react-native-firebase/auth";
import { mnemonicToAccount } from "viem/accounts";
import {
	type SmartAccountClient,
	createSmartAccountClient,
} from "../account-abstraction/createSmartAccountClient";
import {
	toSimpleSmartAccount,
} from "../account-abstraction/toSimpleSmartAccount";
import { createPimlicoClient } from "../bundler/pimlico";

import { getChainInfo } from "../chains/utils";
import { useEnabledChains } from "../hooks";
import type { ChainId, MnemonicData } from "../types";
import { decryptMnemonic } from "../utils";

export type WalletContextParams = {
	eoaAccount: WalletClient | null;
	mainAccount: SmartAccountClient | null;
	publicClient: PublicClient | null;
	isInitialized: boolean;
	isLoading: boolean;
	error: Error | null;
  currentChainId: ChainId;
  updateCurrentChainId: (chainId: ChainId) => void;
}

const initialWalletContext: WalletContextParams = {
	eoaAccount: null,
	mainAccount: null,
	publicClient: null,
	isInitialized: false,
	isLoading: false,
	error: null,
  currentChainId: 1,
  updateCurrentChainId: (chainId: ChainId) => undefined
};

const WalletContext = createContext<WalletContextParams>(initialWalletContext);

export function WalletContextProvider({
	children
}: PropsWithChildren<unknown>): JSX.Element {
  const { chains, defaultChainId } = useEnabledChains();
	const [state, setState] = useState<Omit<WalletContextParams, "isLoading" | "currentChainId" | "updateCurrentChainId">>({
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
		//return chains.find((chain) => chain.id === currentChainId);
		return chainId ? getChainInfo(chainId) : null;
	}, [currentChainId, chains]);

	const updateCurrentChainId = useCallback((chainId: ChainId) => {
		setCurrentChainId(chainId);
	}, []);

	const getMnemonic =
		useCallback(async (): Promise<MnemonicData["mnemonic"] | null> => {
			const user = getAuth().currentUser;
			if (!user) {
				throw new Error("User not authenticated");
			}
			try {
				// Get the mnemonic data for the user
				const enMnemonicData = (await appStorage.getItem(
					user.uid,
				)) as MnemonicData | null;
				if (!enMnemonicData || !enMnemonicData.enMnemonic)
					throw new Error("Mnemonic data not found");
				const mnemonicId = user
					.getIdTokenResult()
					.then((tokenResult) => tokenResult.claims.mnemonicId);
				const mnemonic = await decryptMnemonic(
					enMnemonicData.enMnemonic,
					`${user.uid}${mnemonicId}`,
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
			const mnemonic: MnemonicData["mnemonic"] = await getMnemonic();
			console.log("Mnemonic:", mnemonic);
			if (!mnemonic) throw new Error("Mnemonic not found");
      const account: HDAccount = mnemonicToAccount(mnemonic.phrase);
			const eoaAccount = createWalletClient({
				chain: currentChain,
				transport: http(currentChain.rpcUrl.http[0]),
				account,
			}) as WalletClient;

      // 4. Create/update smart account with current chain
				const publicClient = createPublicClient({
					chain: currentChain,
					transport: http(currentChain.rpcUrls.default.http[0]),
				});

				// 5. Create/update bundler client
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
					}
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
		if (!state.isInitialized) {
			initializeWallet();
		}
	}, [state.isInitialized, initializeWallet]);

	const value = useMemo<WalletContextParams>(
		() => ({
			...state,
			isLoading,
      currentChainId,
      updateCurrentChainId,
		}),
		[state, isLoading, currentChainId, updateCurrentChainId],
	);

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext(): WalletContextParams {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletContextProvider");
  }
  return context;

}
	
