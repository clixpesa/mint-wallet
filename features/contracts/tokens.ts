import type { Address, WalletClient } from "viem";
import type { SmartAccountClient } from "../wallet/account-abstraction/createSmartAccountClient";

type TransferParams = {
	account: SmartAccountClient | WalletClient;
	recipient: Address;
	token: Address;
	amount: string;
};

export async function transferFunds(params: TransferParams) {}
