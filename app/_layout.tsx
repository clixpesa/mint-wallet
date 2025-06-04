import { store } from "@/store/redux";
import { UIProvider } from "@/ui";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { StrictMode } from "react";
import "react-native-get-random-values";
import { install } from "react-native-quick-crypto";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

install();


export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("@/ui/assets/fonts/SpaceMono-Regular.ttf"),
		InputMono: require("@/ui/assets/fonts/InputMono-Regular.ttf"),
		InterBold: require('@/ui/assets/fonts/Inter-Bold.ttf'),
		InterMedium: require('@/ui/assets/fonts/Inter-Medium.ttf'),
		InterRegular: require('@/ui/assets/fonts/Inter-Regular.ttf'),
		InterSemiBold: require('@/ui/assets/fonts/Inter-SemiBold.ttf'),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<StrictMode>
			<SafeAreaProvider>
				<UIProvider>	
					<AppOuter />
				</UIProvider>
			</SafeAreaProvider>
		</StrictMode>
	);
}

function AppOuter(): React.JSX.Element | null {
	return (
		<Provider store={store}>
			<BottomSheetModalProvider>
				<AppInner />
			</BottomSheetModalProvider>
		</Provider>
	)
}

function AppInner(): React.JSX.Element {
	return (
		<SafeAreaView style={{ flex: 1}}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style="auto" />
		</SafeAreaView>
	)
}
