import { create } from "zustand";
import { getAvailableOverdraft } from "../contracts/overdraft";
import { getRate } from "./rates";
import { fetchTokenBalances } from "./tokens/fetchBalances";
import {
	type Address,
	type Balance,
	type ChainId,
	Currency,
	type TokenId,
} from "./types";
interface WalletState {
	currency: Currency;
	tokenBalances: Record<TokenId, Balance>; // Record of address to Balance
	overdraft: Balance;
	fetchBalances: (address: Address, chainId: ChainId) => Promise<void>;
	updateOverdraft: (amount: Balance["balanceUSD"]) => void;
}

const initialWalletState = {
	currency: Currency.KES,
	tokenBalances: {},
	overdraft: {
		balance: 0,
		balanceUSD: 0,
	},
};

export const useWalletState = create<WalletState>((set, get) => ({
	...initialWalletState,
	fetchBalances: async (address, chainId) => {
		const currency = get().currency;
		const { conversionRate } = getRate(currency);
		const tokenBalances = await fetchTokenBalances(address);
		const availableLimit = await getAvailableOverdraft({
			chainId,
			address,
		});
		const overdraft = {
			balance: Number(availableLimit),
			balanceUSD: Number(availableLimit) / conversionRate,
		};
		set({ tokenBalances, overdraft });
	},
	updateOverdraft: (amount: Balance["balanceUSD"]) => {
		const currency = get().currency;
		const { conversionRate } = getRate(currency);
		const overdraft = {
			balance: amount * conversionRate,
			balanceUSD: amount,
		};
		set({ overdraft });
	},
}));

export const useBalances = () => {
	const tokenBalances = useWalletState((s) => s.tokenBalances);
	const currency = useWalletState((s) => s.currency);
	const overdraft = useWalletState((s) => s.overdraft);
	const balances = Object.values(tokenBalances);
	const totalBalanceUSD = balances.reduce(
		(sum, bal) => sum + (bal.balanceUSD || 0),
		0,
	);

	return {
		totalBalanceUSD,
		tokenBalances,
		overdraft,
		currency,
	};
};
