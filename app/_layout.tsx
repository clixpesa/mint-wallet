//import { TestnetModeBanner } from "@/features/essentials";
import { useAppState, useHasAccount } from "@/features/essentials/appState";
import "@/features/utils/shims";
import { WalletContextProvider } from "@/features/wallet";
import { store } from "@/store/redux";
import { UIProvider, useThemeColors } from "@/ui";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { Slot, Stack, router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type React from "react";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function RootLayout() {
	const hasAccount = useAppState((s) => s.hasAccount);
	const [loaded] = useFonts({
		SpaceMono: require("@/ui/assets/fonts/SpaceMono-Regular.ttf"),
		InputMono: require("@/ui/assets/fonts/InputMono-Regular.ttf"),
		InterBold: require("@/ui/assets/fonts/Inter-Bold.ttf"),
		InterMedium: require("@/ui/assets/fonts/Inter-Medium.ttf"),
		InterRegular: require("@/ui/assets/fonts/Inter-Regular.ttf"),
		InterSemiBold: require("@/ui/assets/fonts/Inter-SemiBold.ttf"),
	});

	if (!loaded && hasAccount !== null) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		//<StrictMode>
		<SafeAreaProvider>
			<UIProvider>
				<AppOuter />
			</UIProvider>
		</SafeAreaProvider>
		//</StrictMode>
	);
}

function AppOuter(): React.JSX.Element | null {
	return (
		<Provider store={store}>
			<GestureHandlerRootView>
				<BottomSheetModalProvider>
					<AppInner />
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</Provider>
	);
}

function AppInner(): React.JSX.Element {
	const colors = useThemeColors();
	const segments = useSegments();
	const hasAccount = useHasAccount();
	const isUnlocked = true; //useAppState((s) => s.isUnlocked);
	useEffect(() => {
		if (!hasAccount) {
			router.replace("/(auth)/sign-in");
		} else if (hasAccount && !isUnlocked) {
			router.replace("/(auth)/unlock");
		}
	}, [hasAccount, isUnlocked]);
	const inAuthRoute = segments[0] === "(auth)";

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background.val }}>
			{/*<TestnetModeBanner />*/}
			{inAuthRoute ? (
				<Stack>
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
			) : (
				<WalletContextProvider>
					<Slot />
				</WalletContextProvider>
			)}
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}
