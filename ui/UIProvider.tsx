import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import type { TamaguiProviderProps } from "tamagui";

import { TamaguiProvider } from "tamagui";
import { config } from "./tamagui.config";
import { useSelectedColorScheme } from "./themeStore";

export function UIProvider({
	children,
	...rest
}: Omit<TamaguiProviderProps, "config">) {
	const selectedColorScheme = useSelectedColorScheme();
	const isDark = selectedColorScheme === "dark";

	return (
		<TamaguiProvider
			config={config}
			defaultTheme={isDark ? "dark" : "light"}
			{...rest}
		>
			<ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
				{children}
			</ThemeProvider>
		</TamaguiProvider>
	);
}
