import { Screen } from "@/components/layout/Screen";
import {
	Input,
	Loader,
	Stack,
	Text,
	TouchableArea,
	XStack,
	YStack,
} from "@/ui";
import { Search, X } from "@/ui/components/icons";
import { useMemoCompare } from "@/utilities/react/hooks";
import { useDebounce } from "@/utilities/time/timing";
import isEqual from "lodash/isEqual";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function JoinGroup() {
	const inputRef = useRef<Input>(null);
	const [searchText, setSearchText] = useState("");
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { groups, searchTerm, loading } = useGroupSearch(searchText);

	const handleTextChange = (text: string) => {
		setSearchText(text);
		setTimeout(() => {
			inputRef.current?.setNativeProps({
				contentOffset: { x: Number.MAX_SAFE_INTEGER, y: 0 },
			});
		}, 50);
	};
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 50);
	}, []);

	return (
		<Screen>
			<YStack gap="$sm" width="92%">
				<XStack
					borderWidth={2}
					borderColor="$surface3"
					rounded="$vl"
					items="center"
					px="$sm"
					gap="$vs"
					mb="$sm"
				>
					<Search size={24} color="$neutral2" />
					<Input
						ref={inputRef}
						fontSize="$lg"
						autoFocus
						autoCapitalize="none"
						autoCorrect={false}
						px={1}
						placeholder="search group"
						height="$5xl"
						value={searchText}
						textContentType="none"
						//text={searchText.length > 23 ? "right" : "left"}
						maxW="81%"
						multiline={false}
						onContentSizeChange={() => {
							setTimeout(() => {
								inputRef.current?.setNativeProps({
									contentOffset: { x: Number.MAX_SAFE_INTEGER, y: 0 },
								});
							}, 50);
						}}
						grow={1}
						onChangeText={handleTextChange}
					/>
					{searchText.length > 3 ? (
						<TouchableArea onPress={() => setSearchText("")} hitSlop={10}>
							<X size={24} color="$neutral2" />
						</TouchableArea>
					) : null}
				</XStack>
				{loading || searchTerm !== searchText ? (
					<Stack px="$sm" bg="$surface1" rounded="$lg">
						<Loader.SearchResult />
					</Stack>
				) : !groups.length && searchText.length ? (
					<Stack items="center" px="$sm" py="$md" bg="$surface1" rounded="$lg">
						<Text variant="buttonLabel2">No results found</Text>
						<Text color="$neutral3" text="center" variant="body2">
							The recipient you searched does not exist or is spelled
							incorrectly.
						</Text>
					</Stack>
				) : groups.length ? (
					groups.map((group) => <Text key={group.id}>{group.name}</Text>)
				) : null}
			</YStack>
		</Screen>
	);
}

export function useGroupSearch(searchTerm: string): {
	groups: any[];
	searchTerm: string;
	loading: boolean;
} {
	const allGroups = [
		{
			id: "0x303gdt3248",
			name: "Masomo",
			address: "0xDE0B552766A0B93B0c405f56c6D0999b9916790A",
			admin: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
		},
		{
			id: "0x303gdt3245",
			name: "Education",
			address: "0xDE0B552766A0B93B0c405f56c6D0999b9916790A",
			admin: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
		},
		{
			id: "0x303gdt3238",
			name: "Rennovation",
			address: "0xDE0B552766A0B93B0c405f56c6D0999b9916790A",
			admin: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
		},
		{
			id: "0x453gdt3248",
			name: "Savings Exs",
			address: "0xDE0B552766A0B93B0c405f56c6D0999b9916790A",
			admin: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
		},
		{
			id: "0x304gdt3238",
			name: "Rennovation",
			address: "0xDE0B552766A0B93B0c405f56c6D0999b9916790A",
			admin: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
		},
		{
			id: "0x454gdt3248",
			name: "Savings Round",
			address: "0xDE0B552766A0B93B0c405f56c6D0999b9916790A",
			admin: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
		},
		{
			id: "0x633gdt3248",
			name: "Dream Chasers",
			address: "0xDE0B552766A0B93B0c405f56c6D0999b9916790A",
			admin: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
		},
		{
			id: "0x393gdt3248",
			name: "Masomo",
			address: "0xDE0B552766A0B93B0c405f56c6D0999b9916790A",
			admin: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
		},
	];
	// get recipients based on searchTerm
	const getGroups = useCallback((): any[] => {
		if (!searchTerm.trim()) {
			return [];
		}

		const groups: any[] = [];
		// Mock implementation
		const matchedGroups: any[] = allGroups.filter((group) => {
			return (
				group.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				group.id.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});

		groups.push(...matchedGroups);
		return groups;
	}, [searchTerm]);

	const memoGroups = useMemoCompare(getGroups, isEqual);
	const memoResult = useMemo(
		() => ({
			groups: memoGroups,
			searchTerm,
			loading: false,
		}),
		[memoGroups, searchTerm],
	);

	const debouncedResult = useDebounce(memoResult, 500);

	return searchTerm ? debouncedResult : memoResult;
}
