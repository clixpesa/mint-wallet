import { create } from "zustand";
import { fetchTokenBalances } from "./tokens/fetchBalances";
import { type Address, type Balance, Currency, type TokenId } from "./types";
interface WalletState {
	currency: Currency;
	tokenBalances: Record<TokenId, Balance>; // Record of address to Balance
	fetchBalances: (address: Address) => Promise<void>;
}

const initialWalletState = {
	currency: Currency.KES,
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
	const tokenBalances = useWalletState((s) => s.tokenBalances);
	const currency = useWalletState((s) => s.currency);
	const balances = Object.values(tokenBalances);
	const totalBalanceUSD = balances.reduce(
		(sum, bal) => sum + (bal.balanceUSD || 0),
		0,
	);

	return {
		totalBalanceUSD,
		tokenBalances,
		overdraft: 0,
		currency,
	};
};
