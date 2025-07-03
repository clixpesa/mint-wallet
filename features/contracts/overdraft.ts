import { type Address, type Hex, parseAbi, parseEther, parseUnits } from "viem";
import { type ChainId, getChainInfo, getTokensByChainId } from "../wallet";
//import stableTokenAbi from "./abis/erc20.json";
import overdraftAbi from "./abis/overdraft.json";

type SubscribeUserParams = {
	account: any;
	initialLimit: {
		inUSD: string;
		inLocalCurreny: string;
	};
	chainId: ChainId;
	key?: string;
};

type OverdraftParams = {
	account: any;
	userAddress: Address;
	token: Address;
	amount: string;
};

type TransferWithOverdraftParams = {
	account: any;
	from: Address;
	to: Address;
	token: Address;
	amount: string;
};

export async function subscribeToOverdraft(
	params: SubscribeUserParams,
): Promise<Hex> {
	//Run approvals

	const tokens = getTokensByChainId(params.chainId);
	const chain = getChainInfo(params.chainId);
	const overdraft = chain?.contracts.overdraft;
	let txHash = "0x" as Hex;
	try {
		const approvalPromises = tokens.map((token) => {
			const approvalAmount = token.symbol.includes("USD")
				? (Number(params.initialLimit.inLocalCurreny) * 100).toString()
				: (Number(params.initialLimit.inLocalCurreny) * 100).toFixed(6);
			return params.account.writeContract({
				address: token.address,
				abi: parseAbi([
					"function approve(address spender, uint256 amount) public returns (bool)",
				]),
				functionName: "approve",
				args: [overdraft?.address, parseUnits(approvalAmount, token.decimals)],
			});
		});
		await Promise.all(approvalPromises);
		txHash = await params.account.writeContract({
			address: overdraft?.address,
			abi: overdraftAbi,
			functionName: "subscribeUser",
			args: [
				params.account.account.address,
				parseEther(params.initialLimit.inUSD),
				"CPODTest",
			],
		});
		return txHash;
	} catch (error) {
		console.error("Error in subscribing user:", error);
		return txHash;
	}
}
