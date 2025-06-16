import { useMemoCompare } from "@/utilities/react/hooks";
import { useDebounce } from "@/utilities/time/timing";
import isEqual from "lodash/isEqual";
import { useCallback, useMemo } from "react";

export interface SearchableRecipient {
	key: string;
	name: string | null;
	address: Address;
	phone: string | null;
	txs: number;
}

export function useRecipientSearch(searchTerm: string): {
	recipients: SearchableRecipient[];
	searchTerm: string;
	loading: boolean;
} {
	// get recipients based on searchTerm
	const getRecipients = useCallback((): SearchableRecipient[] => {
		if (!searchTerm) {
			return [];
		}

		const recipients: SearchableRecipient[] = [];
		// Mock implementation
		recipients.push({
			key: "1",
			name: "John Doe",
			address: "0x1234567890abcdef1234567890abcdef12345678" as Address,
			phone: "555-1234",
			txs: 5,
		});

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
