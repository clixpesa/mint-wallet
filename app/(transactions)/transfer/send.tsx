import { AccountIcon } from "@/components/account/AccountIcon";
import { Screen } from "@/components/layout/Screen";
import { useRecipientSearch } from "@/features/essentials";
import {
	ActivityLoader,
	Input,
	Loader,
	Stack,
	Text,
	TouchableArea,
	XStack,
	YStack,
} from "@/ui";
import { Person, ScanQr, Search, X } from "@/ui/components/icons";
import { shortenAddress } from "@/utilities/addresses";
import { useEffect, useRef, useState } from "react";

export default function SendScreen() {
	const inputRef = useRef<Input>(null);
	const [searchText, setSearchText] = useState("");
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { recipients, searchTerm, loading } = useRecipientSearch(searchText);
	console.log(recipients);
	const recentRecipients = [
		{
			key: "0x0001",
			name: null,
			address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
			phone: null,
			txs: 3,
		},
		{
			key: "0x0002",
			name: "@kachdn",
			address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
			phone: "+254712345678",
			txs: 3,
		},
		{
			key: "0x0003",
			name: "@alicekm",
			address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
			phone: null,
			txs: 3,
		},
	];
	const searchResult = {
		key: "0x0002",
		name: "@kachdn",
		address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
		phone: "+254712345678",
		txs: 3,
	};
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
		}, 2000);
	}, []);

	return (
		<Screen
			title="Select recipient"
			rightElement={{
				Icon: <ScanQr size={24} color="$neutral2" />,
				onPress: () => {},
			}}
		>
			<YStack gap="$sm" width="92%">
				<XStack
					borderWidth={2}
					borderColor="$surface3"
					rounded="$vl"
					items="center"
					px="$sm"
					gap="$vs"
					mt="$xl"
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
						placeholder="search phone, tag or address"
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
				<Stack
					px="$sm"
					py={loading || searchTerm !== searchText ? "$none" : "$md"}
					bg="$surface1"
					rounded="$2xl"
				>
					{loading || searchTerm !== searchText ? (
						<Loader.SearchResult />
					) : (
						<XStack items="center" gap="$sm">
							<AccountIcon size={42} address={searchResult.address} />
							<YStack gap="$2xs">
								<Text variant="subHeading2">
									{searchResult.name
										? searchResult.name
										: shortenAddress(searchResult.address, 5)}
								</Text>
								<Text variant="body3" color="$neutral2">
									{searchResult.name
										? searchResult.phone
											? searchResult.phone
											: shortenAddress(searchResult.address, 6)
										: "External account"}
								</Text>
							</YStack>
						</XStack>
					)}
				</Stack>
				<YStack
					bg="$surface1"
					width="100%"
					px="$sm"
					pt="$md"
					pb={isLoading ? "$2xs" : "$xl"}
					rounded="$lg"
					gap="$md"
				>
					<Text color="$neutral2" pl="$xs">
						Most Recent
					</Text>
					{isLoading ? (
						<ActivityLoader opacity={1} />
					) : recentRecipients.length > 0 ? (
						recentRecipients.map((item) => (
							<XStack key={item.key} items="center" gap="$sm">
								<AccountIcon size={42} address={item.address} />
								<YStack gap="$2xs">
									<Text variant="subHeading2">
										{item.name ? item.name : shortenAddress(item.address, 5)}
									</Text>
									<Text variant="body3" color="$neutral2">
										{item.name
											? item.phone
												? item.phone
												: shortenAddress(item.address, 6)
											: "External account"}
									</Text>
								</YStack>
							</XStack>
						))
					) : (
						<XStack items="center" gap="$sm">
							<Stack
								bg="$neutral3"
								height={42}
								rounded="$full"
								width={42}
								items="center"
								justify="center"
							>
								<Person size={32} color="$surface1" />
							</Stack>
							<Text variant="subHeading1" color="$neutral2">
								{" "}
								No recents yet
							</Text>
						</XStack>
					)}
				</YStack>
			</YStack>
		</Screen>
	);
}
