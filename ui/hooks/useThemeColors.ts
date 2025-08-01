// until the web app needs all of tamagui, avoid heavy imports there

import type { ColorTokens, ThemeKeys, ThemeProps } from "@tamagui/core";
import { useTheme } from "@tamagui/core";
import { useMemo } from "react";

// copied from react-native (avoiding import for web)
type OpaqueColorValue = symbol & { __TYPE__: "Color" };

export type DynamicColor = ColorTokens | string | OpaqueColorValue;

export type UseSporeColorsReturn = {
	[key in ThemeKeys]: {
		val: ColorTokens;
		get: () => DynamicColor;
		variable: string;
	};
};

/**
 * Wraps `useTheme` hook to provide spore color theme.
 * Do not pass a conditional value to `name` prop.
 *
 * @param name the theme name
 * @returns `useTheme` hook with the passed color theme
 */
export const useThemeColors = (
	name?: ThemeProps["name"],
): UseSporeColorsReturn => {
	const config = useMemo(() => ({ name }), [name]);

	return useTheme(config) as unknown as UseSporeColorsReturn;
};

export const useColorsFromTheme = (
	name?: ThemeProps["name"],
): UseSporeColorsReturn => {
	const darkColors = useThemeColors("dark");
	const themeColors = useThemeColors();

	return name === "dark" ? darkColors : themeColors;
};
