import {
	type Address,
	type ChainId,
	type Token,
	type TokenId,
	getTokenById,
} from "@/features/wallet";
import { throttle } from "@/utilities/time/timing";
import {
	type FetchArgs,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const apiKey = process.env.EXPO_PUBLIC_BS_APIKEY;

export const blockscoutApi = createApi({
	reducerPath: "blockscoutApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.etherscan.io/v2/api" }),
	endpoints: (builder) => ({
		getTokenTxs: builder.query({
			query: ({
				tokenId,
				address,
			}: {
				tokenId: TokenId;
				address: Address;
			}): FetchArgs => {
				const tokenAddress = getTokenById(tokenId).address;
				const chainId = tokenId.split("_")[1];
				if (!tokenAddress) {
					throw new Error("Problem fetching token transactions");
				}

				return {
					url: "https://api.etherscan.io/v2/api",
					params: {
						chainid: chainId,
						module: "account",
						action: "tokentx",
						contractaddress: tokenAddress,
						address: address,
						page: 1,
						offset: 10,
						startblock: 20000000,
						endblock: "latest",
						sort: "desc",
						apikey: apiKey,
					},
				};
			},
			transformResponse: (response, meta, arg) => ({
				...response,
				tokenId: arg.tokenId,
			}),
		}),

		getAllTokenTxs: builder.query({
			async queryFn(
				{ address, tokens },
				_queryApi,
				_extraOptions,
				fetchWithBQ,
			) {
				try {
					// Query for all tokens
					const queries = tokens.flatMap((token: Token) => {
						const chainId = token.chainId;
						const tokenAddress = token.address;
						const tokenSymbol = token.symbol;
						return {
							chainId,
							tokenAddress,
							tokenSymbol,
						};
					});

					const results = await throttle(
						queries.map(
							(query: { chainId: ChainId; tokenAddress: Address }) => () =>
								fetchWithBQ({
									url: "https://api.etherscan.io/v2/api",
									params: {
										chainid: query.chainId,
										module: "account",
										action: "tokentx",
										contractaddress: query.tokenAddress,
										address: address,
										page: 1,
										offset: 10,
										startblock: 20000000,
										endblock: "latest",
										sort: "desc",
										apikey: apiKey,
									},
								}),
						),
						4,
						1200,
					);

					// Combine successful results
					const combinedData = results.reduce(
						(acc, result, index) => {
							if (result.data?.result?.length) {
								acc.successful.push({
									...result.data,
									tokenId: `${queries[index].tokenSymbol}_${queries[index].chainId}`,
								});
							} else if (result.error) {
								acc.errors.push({
									tokenId: `${queries[index].tokenSymbol}_${queries[index].chainId}`,
									error: result.error,
								});
							}
							return acc;
						},
						{ successful: [], errors: [] } as {
							successful: any[];
							errors: Array<{
								tokenId: TokenId;
								error: any;
							}>;
						},
					);

					// Flatten all transactions into one array with proper null checks
					const allTransactions = combinedData.successful.flatMap(
						(response) => {
							// Check if response and response.result exist and is an array
							if (response?.result && Array.isArray(response.result)) {
								return response.result.map((tx: any) => ({
									...tx,
									tokenId: response.tokenId,
								}));
							}
							return []; // Return empty array if no valid transactions
						},
					);

					// Sort by block number (descending by default)
					allTransactions.sort((a, b) => {
						return Number(b.timeStamp) - Number(a.timeStamp);
					});

					return {
						data: {
							transactions: allTransactions,
							errors: combinedData.errors,
						},
					};
				} catch (error) {
					return {
						data: {
							transactions: [],
							error: {
								status: "CUSTOM_ERROR",
								error: "Failed to fetch token transactions",
								data: error,
							},
						},
					};
				}
			},
		}),
	}),
});

export const {
	useGetTokenTxsQuery,
	useGetAllTokenTxsQuery,
	useLazyGetAllTokenTxsQuery,
} = blockscoutApi;
