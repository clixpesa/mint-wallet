import * as Colors from "@tamagui/colors";

const accentColors = {
	pinkLight: Colors.pink.pink3,
	pinkPastel: Colors.pink.pink7,
	pinkBase: Colors.pink.pink9,
	pinkVibrant: Colors.pink.pink11,
	pinkDark: Colors.pink.pink12,

	redLight: Colors.red.red3,
	redPastel: Colors.red.red7,
	redBase: Colors.red.red9,
	redVibrant: Colors.red.red11,
	redDark: Colors.red.red12,

	orangeLight: Colors.orange.orange3,
	orangePastel: Colors.orange.orange7,
	orangeBase: Colors.orange.orange9,
	orangeVibrant: Colors.orange.orange11,
	orangeDark: Colors.orange.orange12,

	yellowLight: Colors.yellow.yellow3,
	yellowPastel: Colors.yellow.yellow7,
	yellowBase: Colors.yellow.yellow9,
	yellowVibrant: Colors.yellow.yellow11,
	yellowDark: Colors.yellow.yellow12,

	brownLight: Colors.brown.brown3,
	brownPastel: Colors.brown.brown7,
	brownBase: Colors.brown.brown9,
	brownVibrant: Colors.brown.brown11,
	brownDark: Colors.brown.brown12,

	greenLight: Colors.green.green3,
	greenPastel: Colors.green.green7,
	greenBase: Colors.green.green9,
	greenVibrant: Colors.green.green11,
	greenDark: Colors.green.green12,

	limeLight: Colors.lime.lime3,
	limePastel: Colors.lime.lime7,
	limeBase: Colors.lime.lime9,
	limeVibrant: Colors.lime.lime11,
	limeDark: Colors.lime.lime12,

	tealLight: Colors.teal.teal3,
	tealPastel: Colors.teal.teal7,
	tealBase: Colors.teal.teal9,
	tealVibrant: Colors.teal.teal11,
	tealDark: Colors.teal.teal12,

	blueLight: Colors.blue.blue3,
	bluePastel: Colors.blue.blue7,
	blueBase: Colors.blue.blue9,
	blueVibrant: Colors.blue.blue11,
	blueDark: Colors.blue.blue12,

	purpleLight: Colors.purple.purple3,
	purplePastel: Colors.purple.purple7,
	purpleBase: Colors.purple.purple9,
	purpleVibrant: Colors.purple.purple11,
	purpleDark: Colors.purple.purple12,
};

export const colors = {
	white: "#FFFFFF",
	black: "#000000",
	scrim: "rgba(0,0,0,0.60)",
	...accentColors,
};

export const colorsLight = {
	none: "transparent",
	white: colors.white,
	black: colors.black,
	scrim: colors.scrim,

	neutral1: "#131313",
	neutral1Hovered: "rgba(19, 19, 19, 0.83)",
	neutral2: "rgba(19, 19, 19, 0.63)",
	neutral2Hovered: "rgba(19, 19, 19, 0.83)",
	neutral3: "rgba(19, 19, 19, 0.35)",
	neutral3Hovered: "rgba(19, 19, 19, 0.55)",

	surface1: colors.white,
	surface1Hovered: "#FCFCFC",
	surface2: "#F9F9F9",
	surface2Hovered: "#F2F2F2",
	surface3: "rgba(34,34,34,0.05)",
	surface3Solid: "#F2F2F2",
	surface3Hovered: "rgba(19, 19, 19, 0.1)",
	surface4: "rgba(19, 19, 19, 0.08)",
	surface5: "rgba(0,0,0,0.04)",
	surface5Hovered: "rgba(0,0,0,0.06)",

	accent1: Colors.teal.teal11,
	accent1Hovered: Colors.tealA.tealA11,
	accent2: Colors.teal.teal12,
	accent2Hovered: Colors.tealA.tealA12,
	accent2Solid: Colors.teal.teal3,
	accent3: "#222222",
	accent3Hovered: colors.black,

	statusSuccess: "#0C8911",
	statusSuccessHovered: "#06742C",
	statusSuccess2: "rgba(15, 194, 68, 0.06)",
	statusSuccess2Hovered: "rgba(15, 194, 68, 0.12)",
	statusWarning: "#996F01",
	statusWarningHovered: "#7A5801",
	statusWarning2: "rgba(255, 191, 23, 0.1)",
	statusWarning2Hovered: "rgba(255, 191, 23, 0.1)",
	statusCritical: "#E10F0F",
	statusCriticalHovered: "#BF0D0D",
	statusCritical2: "rgba(255, 0, 0, 0.05)",
	statusCritical2Hovered: "rgba(255, 0, 0, 0.1)",
};

export const colorsDark = {
	none: "transparent",
	white: colors.white,
	black: colors.black,
	scrim: colors.scrim,

	neutral1: colors.white,
	neutral1Hovered: "rgba(255, 255, 255, 0.85)",
	neutral2: "rgba(255, 255, 255, 0.65)",
	neutral2Hovered: "rgba(255, 255, 255, 0.85)",
	neutral3: "rgba(255, 255, 255, 0.38)",
	neutral3Hovered: "rgba(255, 255, 255, 0.58)",

	surface1: "#131313",
	surface1Hovered: "#1A1A1A",
	surface2: "#1F1F1F",
	surface2Hovered: "#242424",
	surface3: "rgba(255,255,255,0.12)",
	surface3Solid: "#393939",
	surface3Hovered: "rgba(255,255,255,0.16)",
	surface4: "rgba(255,255,255,0.20)",
	surface5: "rgba(0,0,0,0.04)",
	surface5Hovered: "rgba(0,0,0,0.06)",

	accent1: Colors.teal.teal11,
	accent1Hovered: Colors.tealA.tealA11,
	accent2: Colors.teal.teal12,
	accent2Hovered: Colors.tealA.tealA12,
	accent2Solid: Colors.tealDark.teal3,
	accent3: colors.white,
	accent3Hovered: Colors.whiteA.whiteA11,

	statusSuccess: "#21C95E",
	statusSuccessHovered: "#15863C",
	statusSuccess2: "rgba(33, 201, 94, 0.12)",
	statusSuccess2Hovered: "#093A16",
	statusWarning: "#FFBF17",
	statusWarningHovered: "#FFDD0D",
	statusWarning2: "rgba(255, 191, 23, 0.08)",
	statusWarning2Hovered: "rgba(255, 191, 23, 0.16)",
	statusCritical: "#FF593C",
	statusCriticalHovered: "#FF401F",
	statusCritical2: "rgba(255, 89, 60, 0.12)",
	statusCritical2Hovered: "rgba(255, 89, 60, 0.2)",
};

export type ColorKeys = keyof typeof colorsLight;
