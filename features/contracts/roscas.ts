import { isSameAddress } from "@/utilities/addresses";
import {
	type Address,
	type Hex,
	createPublicClient,
	formatUnits,
	getContract,
	http,
	parseAbi,
	parseEther,
	parseUnits,
	zeroAddress,
} from "viem";
import {
	type ChainId,
	type TokenId,
	getChainInfo,
	getTokenById,
	getTokensByChainId,
} from "../wallet";
import roscasAbi from "./abis/roscas.json";

export type GroupSpaceInfo = {
	spaceId: string;
	name: string;
	admin: Address;
	token: Address;
	payoutAmount: number;
	interval: number;
	startDate: number;
	memberCount: number;
};

export type RoscaInfo = GroupSpaceInfo & {
	totalBalance: number;
	yield: number;
	loan: number;
};

export const frequencyOptions = [
	{
		name: "Weekly",
		frequency: "Weekly",
		desc: "Every 7 days",
		interval: 604800,
	},
	{
		name: "every 2 Weeks",
		frequency: "2 Weeks",
		desc: "Every 14 days",
		interval: 1209600,
	},
	{
		name: "every 3 Weeks",
		frequency: "3 Weeks",
		desc: "Every 21 days",
		interval: 1814400,
	},
	{
		name: "Monthly",
		frequency: "Monthly",
		desc: "Every 28 days",
		interval: 2419200,
	},
	{
		name: "every 2 Months",
		frequency: "2 Months",
		desc: "Every 56 days",
		interval: 4838400,
	},
];

type CreateRoscaParams = {
	account: any;
	name: string;
	tokenId: TokenId;
	payoutAmount: string;
	interval: number;
	memberCount: number;
	startDate: number;
	key?: string;
};

export async function createRosca(
	params: CreateRoscaParams,
): Promise<{ txHash: Hex; spaceId?: string }> {
	const token = getTokenById(params.tokenId);
	const tokens = getTokensByChainId(token.chainId);
	const chain = getChainInfo(token.chainId);
	const rosca = chain?.contracts.roscas;
	const publicClient = createPublicClient({
		chain,
		transport: http(chain.rpcUrls.default.http[0]),
	});
	let txHash = "0x" as Hex;
	try {
		const approvalPromises = tokens.map((token) => {
			const approvalAmount = (Number(params.payoutAmount) * 10).toFixed(6);
			return params.account.writeContract({
				address: token.address,
				abi: parseAbi([
					"function approve(address spender, uint256 amount) public returns (bool)",
				]),
				functionName: "approve",
				args: [rosca?.address, parseUnits(approvalAmount, token.decimals)],
			});
		});
		//await Promise.all(approvalPromises);
		txHash = await params.account.writeContract({
			address: rosca?.address,
			abi: roscasAbi,
			functionName: "createRosca",
			args: [
				params.name,
				token.address,
				[
					parseEther(params.payoutAmount),
					params.memberCount,
					params.interval,
					params.startDate,
				],
			],
		});
		const receipt = await publicClient.getTransactionReceipt({ hash: txHash });
		const logs = receipt.logs.filter((log) =>
			isSameAddress(log.address, rosca?.address),
		);
		const spaceId = logs[0].topics[2]?.substring(0, 18);
		return { txHash, spaceId };
	} catch (error) {
		console.error("Error creating rosca:", error);
		return { txHash, spaceId: undefined };
	}
}

export async function getRosca({
	chainId,
	spaceId,
}: { chainId: ChainId; spaceId: string }): Promise<RoscaInfo> {
	const chain = getChainInfo(chainId);
	const roscaContrant = chain.contracts.roscas;
	const publicClient = createPublicClient({
		chain,
		transport: http(chain.rpcUrls.default.http[0]),
	});
	const contract = getContract({
		address: roscaContrant?.address,
		abi: roscasAbi,
		client: publicClient,
	});
	try {
		const rosca: any[] = await contract.read.roscas([spaceId]);
		const userRosca = {
			spaceId: rosca[0],
			name: rosca[1],
			admin: rosca[2],
			token: rosca[3],
			totalBalance: Number(formatUnits(rosca[4], 18)),
			yield: Number(formatUnits(rosca[5], 18)),
			loan: Number(formatUnits(rosca[6], 18)),
			payoutAmount: Number(formatUnits(rosca[7].payoutAmount, 18)),
			interval: Number(rosca[7].interaval),
			startDate: Number(rosca[7].startDate),
			memberCount: Number(rosca[7].memberCount),
		} as RoscaInfo;

		return userRosca;
	} catch (error) {
		console.error("Error fetching rosca:", error);
		return {} as RoscaInfo;
	}
}

export async function isUserSlotted({
	chainId,
	spaceId,
	userAddress,
}: {
	chainId: ChainId;
	spaceId: string;
	userAddress: Address;
}): Promise<{ isSlotted: boolean; freeSlots: number }> {
	const chain = getChainInfo(chainId);
	const roscaContrant = chain.contracts.roscas;
	const publicClient = createPublicClient({
		chain,
		transport: http(chain.rpcUrls.default.http[0]),
	});
	const contract = getContract({
		address: roscaContrant?.address,
		abi: roscasAbi,
		client: publicClient,
	});

	const slot: any[] = await contract.read.userSlot([userAddress, spaceId]);
	const roscaSlots: any[] = await contract.read.getRoscaSlots([spaceId]);
	const freeSlots = roscaSlots.filter((slot) =>
		isSameAddress(slot.owner, zeroAddress),
	);
	return {
		isSlotted: isSameAddress(slot[4], userAddress),
		freeSlots: freeSlots.length,
	};
}

export async function getUserRoscas({
	chainId,
	address,
}: { chainId: ChainId; address: Address }): Promise<RoscaInfo[]> {
	const chain = getChainInfo(chainId);
	const roscaContrant = chain.contracts.roscas;
	const publicClient = createPublicClient({
		chain,
		transport: http(chain.rpcUrls.default.http[0]),
	});
	const contract = getContract({
		address: roscaContrant?.address,
		abi: roscasAbi,
		client: publicClient,
	});
	const rawRoscas: any[] = await contract.read.getUserRoscas([address]);
	const userRoscas: RoscaInfo[] = rawRoscas.map((rosca) => ({
		spaceId: rosca.id,
		name: rosca.name,
		admin: rosca.admin,
		token: rosca.token,
		totalBalance: Number(formatUnits(rosca.totalBalance, 18)),
		yield: Number(formatUnits(rosca.yield, 18)),
		loan: Number(formatUnits(rosca.loan, 18)),
		payoutAmount: Number(formatUnits(rosca.slotInfo.payoutAmount, 18)),
		interval: Number(rosca.slotInfo.interaval),
		startDate: Number(rosca.slotInfo.startDate),
		memberCount: Number(rosca.slotInfo.memberCount),
	}));
	return userRoscas;
}
