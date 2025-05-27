import { tokens } from "./tokens";

const lightTheme = {
	background: tokens.color.white,
	backgroundHover: tokens.color.gray1,
	backgroundPress: tokens.color.gray2,
	backgroundFocus: tokens.color.gray3,
	backgroundStrong: tokens.color.gray1,
	transparent: "transparent",

	color: tokens.color.gray10,
	colorHover: tokens.color.gray9,
	colorPress: tokens.color.gray8,
	colorFocus: tokens.color.gray8,
	colorTransparent: "transparent",

	borderColor: tokens.color.gray4,
	borderColorHover: tokens.color.gray5,
	borderColorPress: tokens.color.gray6,
	borderColorFocus: tokens.color.gray7,

	placeholderColor: tokens.color.gray5,

	teal: tokens.color.teal8,
	tealHover: tokens.color.teal9,
	tealPress: tokens.color.teal10,
	tealFocus: tokens.color.teal10,
	tealTransparent: tokens.color.teal1,

	secondary: tokens.color.gray5,
	secondaryHover: tokens.color.gray6,
	secondaryPress: tokens.color.gray7,
	secondaryFocus: tokens.color.gray7,
};

type BaseTheme = typeof lightTheme;

const darkTheme: BaseTheme = {
	background: tokens.color.gray10,
	backgroundHover: tokens.color.gray9,
	backgroundPress: tokens.color.gray8,
	backgroundFocus: tokens.color.gray7,
	backgroundStrong: tokens.color.gray9,
	transparent: "transparent",

	color: tokens.color.white,
	colorHover: tokens.color.gray2,
	colorPress: tokens.color.gray3,
	colorFocus: tokens.color.gray3,
	colorTransparent: "transparent",

	borderColor: tokens.color.gray8,
	borderColorHover: tokens.color.gray7,
	borderColorPress: tokens.color.gray6,
	borderColorFocus: tokens.color.gray5,

	placeholderColor: tokens.color.gray7,

	teal: tokens.color.teal7,
	tealHover: tokens.color.teal6,
	tealPress: tokens.color.teal5,
	tealFocus: tokens.color.teal5,
	tealTransparent: tokens.color.teal11,

	secondary: tokens.color.gray7,
	secondaryHover: tokens.color.gray6,
	secondaryPress: tokens.color.gray5,
	secondaryFocus: tokens.color.gray5,
};

const allThemes = {
	light: lightTheme,
	dark: darkTheme,
};

type ThemeName = keyof typeof allThemes;
type Themes = {
	[key in ThemeName]: BaseTheme;
};

export const themes: Themes = allThemes;
