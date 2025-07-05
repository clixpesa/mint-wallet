import { OnboardingContextProvider } from "@/features/essentials";
import { Stack } from "expo-router";

export default function AuthLayout() {
	return (
		<OnboardingContextProvider>
			<Stack.Screen options={{ headerShown: false }} />
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="landing" />
				<Stack.Screen name="sign-in" />
				<Stack.Screen name="verify" />
				<Stack.Screen name="username" />
				<Stack.Screen name="unlock" />
			</Stack>
		</OnboardingContextProvider>
	);
}
