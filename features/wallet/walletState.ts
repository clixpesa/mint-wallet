import { create } from "zustand";
import { fetchTokenBalances } from "./tokens/fetchBalances";
import type { Address, Balance, TokenId } from "./types";

interface WalletState {
	tokenBalances: Record<TokenId, Balance>; // Record of address to Balance

	fetchBalances: (address: Address) => Promise<void>;
}

const initialWalletState = {
	tokenBalances: {},
};

export const useWalletState = create<WalletState>((set, get) => ({
	...initialWalletState,
	fetchBalances: async (address) => {
		const tokenBalances = await fetchTokenBalances(address);
		set({ tokenBalances });
	},
}));

export const useBalances = () => {
	const { tokenBalances } = useWalletState();
	const totalBalanceUSD = 0;

	Object.values(tokenBalances).forEach((item) => {
		totalBalanceUSD + item.balanceUSD;
	});

	return {
		totalBalanceUSD,
		tokenBalances,
		overdraft: 0,
	};
};
