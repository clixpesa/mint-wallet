const accentColors = {
	tealLight: "#ccfbf1",
	tealPastel: "#2dd4bf",
	tealBase: "#0f766e",
	tealVibrant: "#14b8a6",
	tealDark: "#134e4a",

	pinkLight: "#FEF4FF",
	pinkPastel: "#FDAFF0",
	pinkBase: "#FC74FE",
	pinkVibrant: "#F50DB4",
	pinkDark: "#361A37",

	redLight: "#FFF2F1",
	redPastel: "#FDCFC4",
	redBase: "#FF5F52",
	redVibrant: "#FF0000",
	redDark: "#220D0C",

	orangeLight: "#FEF5EA",
	orangePastel: "#FFE8BC",
	orangeBase: "#FF8934",
	orangeVibrant: "#FF4D00",
	orangeDark: "#371B0C",

	yellowLight: "#FFFE8B",
	yellowPastel: "#FFF8B4",
	yellowBase: "#FFBF17",
	yellowVibrant: "#FFF612",
	yellowDark: "#1F1E02",

	brownLight: "#F7F6F1",
	brownPastel: "#E2E0CD",
	brownBase: "#85754A",
	brownVibrant: "#996F01",
	brownDark: "#231E0F",

	greenLight: "#EEFBF1",
	greenPastel: "#C2E7D0",
	greenBase: "#0C8911",
	greenVibrant: "#21C95E",
	greenDark: "#0F2C1A",

	limeLight: "#F7FEEB",
	limePastel: "#E4F6C4",
	limeBase: "#78E744",
	limeVibrant: "#B1F13C",
	limeDark: "#232917",

	turquoiseLight: "#F7FEEB",
	turquoisePastel: "#CAFFDF",
	turquoiseBase: "#00C3A0",
	turquoiseVibrant: "#5CFE9D",
	turquoiseDark: "#1A2A21",

	cyanLight: "#EBF8FF",
	cyanPastel: "#B9E3F8",
	cyanBase: "#23A3FF",
	cyanVibrant: "#3ADCFF",
	cyanDark: "#15242B",

	blueLight: "#EFF4FF",
	bluePastel: "#D0D9F8",
	blueBase: "#4981FF",
	blueVibrant: "#0047FF",
	blueDark: "#10143D",

	purpleLight: "#FAF5FF",
	purplePastel: "#E9D8FD",
	purpleBase: "#9E62FF",
	purpleVibrant: "#4300B0",
	purpleDark: "#1A0040",
};

export const colors = {
	white: "#FFFFFF",
	black: "#000000",
	scrim: "rgba(0,0,0,0.60)",

	...accentColors,

	fiatOnRampBanner: "#FB36D0",
};

export const networkColors = {
	ethereum: {
		light: "#627EEA",
		dark: "#627EEA",
	},
	optimism: {
		light: "#FF0420",
		dark: "#FF0420",
	},
	arbitrum: {
		light: "#12AAFF",
		dark: "#12AAFF",
	},
	bnb: {
		light: "#B08603",
		dark: "#FFBF17",
	},
	base: {
		light: "#0052FF",
		dark: "#0052FF",
	},
	avalanche: {
		light: "#E84142",
		dark: "#E84142",
	},
	celo: {
		light: "#222222",
		dark: "#FCFF52",
	},
	unichain: {
		light: "#fc0fa4",
		dark: "#fc0fa4",
	},
};

const sporeLight = {
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

	accent1: "#0f766e",
	accent1Hovered: "#115e59",
	accent2: "#ccfbf1",
	accent2Hovered: "#99f6e4",
	accent2Solid: "#f0fdfa",
	accent3: "#02201f",
	accent3Hovered: "#042f2e",

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

const sporeDark = {
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

	accent1: "#115e59",
	accent1Hovered: "#0f766e",
	accent2: "#02201f",
	accent2Hovered: "#042f2e",
	accent2Solid: "#02201f",
	accent3: colors.white,
	accent3Hovered: "#F5F5F5",

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

export const colorsLight = {
	none: "transparent",

	white: sporeLight.white,
	black: sporeLight.black,
	scrim: sporeLight.scrim,

	neutral1: sporeLight.neutral1,
	neutral1Hovered: sporeLight.neutral1Hovered,
	neutral2: sporeLight.neutral2,
	neutral2Hovered: sporeLight.neutral2Hovered,
	neutral3: sporeLight.neutral3,
	neutral3Hovered: sporeLight.neutral3Hovered,

	surface1: sporeLight.surface1,
	surface1Hovered: sporeLight.surface1Hovered,
	surface2: sporeLight.surface2,
	surface2Hovered: sporeLight.surface2Hovered,
	surface3: sporeLight.surface3,
	surface3Solid: sporeLight.surface3Solid,
	surface3Hovered: sporeLight.surface3Hovered,
	surface4: sporeLight.surface4,
	surface5: sporeLight.surface5,
	surface5Hovered: sporeLight.surface5Hovered,

	accent1: sporeLight.accent1,
	accent1Hovered: sporeLight.accent1Hovered,
	accent2: sporeLight.accent2,
	accent2Solid: sporeLight.accent2Solid,
	accent2Hovered: sporeLight.accent2Hovered,
	accent3: sporeLight.accent3,
	accent3Hovered: sporeLight.accent3Hovered,

	statusSuccess: sporeLight.statusSuccess,
	statusSuccessHovered: sporeLight.statusSuccessHovered,
	statusSuccess2: sporeLight.statusSuccess2,
	statusSuccess2Hovered: sporeLight.statusSuccess2Hovered,
	statusCritical: sporeLight.statusCritical,
	statusCriticalHovered: sporeLight.statusCriticalHovered,
	statusCritical2: sporeLight.statusCritical2,
	statusCritical2Hovered: sporeLight.statusCritical2Hovered,
	statusWarning: sporeLight.statusWarning,
	statusWarningHovered: sporeLight.statusWarningHovered,
	statusWarning2: sporeLight.statusWarning2,
	statusWarning2Hovered: sporeLight.statusWarning2Hovered,

	chain_1: sporeLight.neutral1,
	chain_130: networkColors.unichain.light,
	chain_10: networkColors.optimism.light,
	chain_42161: networkColors.arbitrum.light,
	chain_8453: networkColors.base.light,
	chain_56: networkColors.bnb.light,
	chain_42220: networkColors.celo.light,
	chain_43114: networkColors.avalanche.light,

	// Testnets
	chain_11155111: networkColors.ethereum.light,
	chain_1301: networkColors.unichain.light,
	chain_84532: networkColors.base.light,
	chain_44787: networkColors.celo.light,

	tealThemed: colors.tealLight,
};

export type ColorKeys = keyof typeof colorsLight;

export const colorsDark = {
	none: "transparent",

	white: sporeDark.white,
	black: sporeDark.black,
	scrim: sporeDark.scrim,

	surface1: sporeDark.surface1,
	surface1Hovered: sporeDark.surface1Hovered,
	surface2: sporeDark.surface2,
	surface2Hovered: sporeDark.surface2Hovered,
	surface3: sporeDark.surface3,
	surface3Solid: sporeDark.surface3Solid,
	surface3Hovered: sporeDark.surface3Hovered,
	surface4: sporeDark.surface4,
	surface5: sporeDark.surface5,
	surface5Hovered: sporeDark.surface5Hovered,

	neutral1: sporeDark.neutral1,
	neutral1Hovered: sporeDark.neutral1Hovered,
	neutral2: sporeDark.neutral2,
	neutral2Hovered: sporeDark.neutral2Hovered,
	neutral3: sporeDark.neutral3,
	neutral3Hovered: sporeDark.neutral3Hovered,

	accent1: sporeDark.accent1,
	accent1Hovered: sporeDark.accent1Hovered,
	accent2: sporeDark.accent2,
	accent2Solid: sporeDark.accent2Solid,
	accent2Hovered: sporeDark.accent2Hovered,
	accent3: sporeDark.accent3,
	accent3Hovered: sporeDark.accent3Hovered,

	statusSuccess: sporeDark.statusSuccess,
	statusSuccessHovered: sporeDark.statusSuccessHovered,
	statusSuccess2: sporeDark.statusSuccess2,
	statusSuccess2Hovered: sporeDark.statusSuccess2Hovered,
	statusCritical: sporeDark.statusCritical,
	statusCriticalHovered: sporeDark.statusCriticalHovered,
	statusCritical2: sporeDark.statusCritical2,
	statusCritical2Hovered: sporeDark.statusCritical2Hovered,
	statusWarning: sporeDark.statusWarning,
	statusWarningHovered: sporeDark.statusWarningHovered,
	statusWarning2: sporeDark.statusWarning2,
	statusWarning2Hovered: sporeDark.statusWarning2Hovered,

	chain_1: sporeDark.neutral1,
	chain_130: networkColors.unichain.dark,
	chain_10: networkColors.optimism.dark,
	chain_42161: networkColors.arbitrum.dark,
	chain_8453: networkColors.base.dark,
	chain_56: networkColors.bnb.dark,
	chain_42220: networkColors.celo.dark,
	chain_43114: networkColors.avalanche.dark,

	// Testnets
	chain_11155111: networkColors.ethereum.dark,
	chain_1301: networkColors.unichain.dark,
	chain_84532: networkColors.base.dark,
	chain_44787: networkColors.celo.dark,

	tealThemed: colors.tealDark,
};

export type GlobalPalette = typeof colors;
export type GlobalColorNames = keyof GlobalPalette;
export type Palette = typeof colorsLight;
