import { createFont, isAndroid } from "@tamagui/core";

// Font weights
const INTER_WEIGHT = "400";
const MEDIUM_WEIGHT = "500";
const SEMIBOLD_WEIGHT = "600";
const BOLD_WEIGHT = "700";

// Font families
const fontFamily = {
	inter: "Inter-Regular",
	medium: "Inter-Medium",
	semibold: "Inter-SemiBold",
	bold: "Inter-Bold",
	monospace: "SpaceMono-Regular",
};

const androidFace = {
	[INTER_WEIGHT]: { normal: fontFamily.inter },
	[MEDIUM_WEIGHT]: { normal: fontFamily.medium },
	[SEMIBOLD_WEIGHT]: { normal: fontFamily.semibold },
	[BOLD_WEIGHT]: { normal: fontFamily.bold },
};

const getFontProps = (family: string, weight: string) => ({
	family,
	...(isAndroid ? { face: androidFace } : null),
	weight: {
		true: weight,
	},
});

export const fonts = {
	heading1: {
		family: fontFamily.bold,
		fontSize: 52,
		lineHeight: 52 * 0.96,
		weight: BOLD_WEIGHT,
	},
	heading2: {
		family: fontFamily.bold,
		fontSize: 36,
		lineHeight: 40,
		weight: BOLD_WEIGHT,
	},
	heading3: {
		family: fontFamily.bold,
		fontSize: 24,
		lineHeight: 24 * 1.2,
		weight: BOLD_WEIGHT,
	},
	subheading1: {
		family: fontFamily.semibold,
		fontSize: 18,
		lineHeight: 24,
		weight: SEMIBOLD_WEIGHT,
	},
	subheading2: {
		family: fontFamily.semibold,
		fontSize: 16,
		lineHeight: 20,
		weight: SEMIBOLD_WEIGHT,
	},
	body1: {
		family: fontFamily.inter,
		fontSize: 18,
		lineHeight: 18 * 1.3,
		weight: INTER_WEIGHT,
	},
	body2: {
		family: fontFamily.inter,
		fontSize: 16,
		lineHeight: 16 * 1.3,
		weight: INTER_WEIGHT,
	},
	body3: {
		family: fontFamily.inter,
		fontSize: 14,
		lineHeight: 14 * 1.3,
		weight: INTER_WEIGHT,
	},
	body4: {
		family: fontFamily.inter,
		fontSize: 12,
		lineHeight: 16,
		weight: INTER_WEIGHT,
	},
	buttonLabel1: {
		family: fontFamily.semibold,
		fontSize: 18,
		lineHeight: 18 * 1.15,
		weight: SEMIBOLD_WEIGHT,
	},
	buttonLabel2: {
		family: fontFamily.semibold,
		fontSize: 16,
		lineHeight: 16 * 1.15,
		weight: SEMIBOLD_WEIGHT,
	},
	buttonLabel3: {
		family: fontFamily.semibold,
		fontSize: 14,
		lineHeight: 14 * 1.15,
		weight: SEMIBOLD_WEIGHT,
	},
	buttonLabel4: {
		family: fontFamily.semibold,
		fontSize: 12,
		lineHeight: 12 * 1.15,
		weight: SEMIBOLD_WEIGHT,
	},
	monospace: {
		family: fontFamily.monospace,
		fontSize: 12,
		lineHeight: 16,
		weight: INTER_WEIGHT,
	},
} as const;

export const headingFont = createFont({
	...getFontProps(fontFamily.bold, BOLD_WEIGHT),
	size: {
		small: fonts.heading3.fontSize,
		medium: fonts.heading2.fontSize,
		large: fonts.heading1.fontSize,
		true: fonts.heading2.fontSize,
	},
	lineHeight: {
		small: fonts.heading3.lineHeight,
		medium: fonts.heading2.lineHeight,
		large: fonts.heading1.lineHeight,
		true: fonts.heading2.lineHeight,
	},
});

export const subHeadingFont = createFont({
	...getFontProps(fontFamily.semibold, SEMIBOLD_WEIGHT),
	size: {
		small: fonts.subheading2.fontSize,
		large: fonts.subheading1.fontSize,
		true: fonts.subheading1.fontSize,
	},
	lineHeight: {
		small: fonts.subheading2.lineHeight,
		large: fonts.subheading1.lineHeight,
		true: fonts.subheading1.lineHeight,
	},
});

export const bodyFont = createFont({
	...getFontProps(fontFamily.inter, INTER_WEIGHT),
	size: {
		micro: fonts.body4.fontSize,
		small: fonts.body3.fontSize,
		medium: fonts.body2.fontSize,
		large: fonts.body1.fontSize,
		true: fonts.body2.fontSize,
	},
	lineHeight: {
		micro: fonts.body4.lineHeight,
		small: fonts.body3.lineHeight,
		medium: fonts.body2.lineHeight,
		large: fonts.body1.lineHeight,
		true: fonts.body2.lineHeight,
	},
});

export const buttonFont = createFont({
	...getFontProps(fontFamily.semibold, SEMIBOLD_WEIGHT),
	size: {
		micro: fonts.buttonLabel4.fontSize,
		small: fonts.buttonLabel3.fontSize,
		medium: fonts.buttonLabel2.fontSize,
		large: fonts.buttonLabel1.fontSize,
		true: fonts.buttonLabel2.fontSize,
	},
	lineHeight: {
		micro: fonts.buttonLabel4.lineHeight,
		small: fonts.buttonLabel3.lineHeight,
		medium: fonts.buttonLabel2.lineHeight,
		large: fonts.buttonLabel1.lineHeight,
		true: fonts.buttonLabel2.lineHeight,
	},
});

export const allFonts = {
	heading: headingFont,
	subHeading: subHeadingFont,
	body: bodyFont,
	button: buttonFont,
};
