import { isAddress, isSameAddress } from "@/utilities/addresses";
import { useMemoCompare } from "@/utilities/react/hooks";
import { useDebounce } from "@/utilities/time/timing";
import isEqual from "lodash/isEqual";
import { useCallback, useMemo } from "react";
import dummyUsers from "./dummyusers.json";

export interface SearchableRecipient {
	key: string;
	name: string | null;
	address: Address;
	phone: string | null;
	txs: number;
}

interface DummyUser {
	uuid: string;
	phone: string | null;
	name: string | null;
	tag?: string | null;
	address: Address;
}

export function useRecipientSearch(searchTerm: string): {
	recipients: SearchableRecipient[];
	searchTerm: string;
	loading: boolean;
} {
	// get recipients based on searchTerm
	const getRecipients = useCallback((): SearchableRecipient[] => {
		if (!searchTerm.trim()) {
			return [];
		}

		const recipients: SearchableRecipient[] = [];
		const isAddressSearch =
			searchTerm.startsWith("0x") && isAddress(searchTerm);
		const isPhoneSearch =
			(searchTerm.startsWith("+") || searchTerm.startsWith("0")) &&
			searchTerm.length > 9 &&
			!isAddressSearch;
		// Mock implementation
		const matchedUsers: DummyUser[] = dummyUsers.filter((user) => {
			if (isAddressSearch) {
				return isSameAddress(user.address, searchTerm);
			}
			if (isPhoneSearch) {
				return user.phone?.includes(searchTerm.slice(2));
			}
			return (
				user.tag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.address.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});
		if (isAddressSearch && matchedUsers.length === 0) {
			recipients.push({
				key: `addr-${searchTerm}`,
				name: null,
				address: searchTerm as Address,
				phone: null,
				txs: 0,
			});
		}
		recipients.push(
			...matchedUsers.map((user) => ({
				key: user.uuid,
				name: user.name || user.tag || null,
				address: user.address as Address,
				phone: user.phone,
				txs: 0,
			})),
		);
		return recipients;
	}, [searchTerm]);

	const memoRecipients = useMemoCompare(getRecipients, isEqual);
	const memoResult = useMemo(
		() => ({
			recipients: memoRecipients,
			searchTerm,
			loading: false,
		}),
		[memoRecipients, searchTerm],
	);

	const debouncedResult = useDebounce(memoResult, 500);

	return searchTerm ? debouncedResult : memoResult;
}

export function useSearchInput() {
	// Hook logic goes here
}
