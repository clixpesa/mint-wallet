import { colorsDark, colorsLight } from "./colors";

const { none: lightTransparent, ...tamaguiColorsLight } = colorsLight;
const { none: darkTransparent, ...tamaguiColorsDark } = colorsDark;

const light = {
	...tamaguiColorsLight,
	transparent: lightTransparent,
	background: colorsLight.surface1,
	backgroundHover: colorsLight.surface2,
	backgroundPress: colorsLight.surface2,
	backgroundFocus: colorsLight.surface2,
	borderColor: colorsLight.none,
	borderColorHover: colorsLight.none,
	borderColorFocus: colorsLight.none,
	outlineColor: colorsLight.none,
	color: colorsLight.neutral1,
	colorHover: colorsLight.accent1,
	colorPress: colorsLight.accent1,
	colorFocus: colorsLight.accent1,
	shadowColor: "rgba(0,0,0,0.15)",
	shadowColorHover: "rgba(0,0,0,0.2)",
};

type BaseTheme = typeof light;

const dark: BaseTheme = {
	...tamaguiColorsDark,
	transparent: darkTransparent,
	background: colorsDark.surface1,
	backgroundHover: colorsDark.surface2,
	backgroundPress: colorsDark.surface2,
	backgroundFocus: colorsDark.surface2,
	borderColor: colorsDark.none,
	borderColorHover: colorsDark.none,
	borderColorFocus: colorsDark.none,
	outlineColor: colorsDark.none,
	color: colorsDark.neutral1,
	colorHover: colorsDark.accent1,
	colorPress: colorsDark.accent1,
	colorFocus: colorsDark.accent1,
	shadowColor: "rgba(0,0,0,0.4)",
	shadowColorHover: "rgba(0,0,0,0.5)",
};

export type ThemeNames =
	| "primary"
	| "secondary"
	| "tertiary"
	| "outline"
	| "success"
	| "warning";

const light_primary: BaseTheme = { ...light, color: colorsLight.accent1 };
const dark_primary: BaseTheme = { ...dark, color: colorsDark.accent1 };
const light_secondary: BaseTheme = { ...light };
const dark_secondary: BaseTheme = { ...dark, color: colorsDark.neutral2 };
const light_tertiary: BaseTheme = { ...light };
const dark_tertiary: BaseTheme = { ...dark };
const light_outline: BaseTheme = { ...light };
const dark_outline: BaseTheme = { ...dark };
const light_success: BaseTheme = { ...light };
const dark_success: BaseTheme = { ...dark };
const light_warning: BaseTheme = { ...light };
const dark_warning: BaseTheme = { ...dark };

const allThemes = {
	light,
	dark,
	light_primary,
	dark_primary,
	light_secondary,
	dark_secondary,
	light_tertiary,
	dark_tertiary,
	light_outline,
	dark_outline,
	light_success,
	dark_success,
	light_warning,
	dark_warning,
};

type ThemeName = keyof typeof allThemes;
type Themes = {
	[key in ThemeName]: BaseTheme;
};

export const themes: Themes = allThemes;
