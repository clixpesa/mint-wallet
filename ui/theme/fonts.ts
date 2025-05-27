import { createFont } from "@tamagui/core";

const interFont = createFont({
	family: "Inter, Helvetica, Arial, sans-serif",
	size: {
		xs: 12,
		sm: 14,
		md: 16,
		base: 16,
		lg: 18,
		xl: 20,
		"2xl": 24,
		"3xl": 28,
		"4xl": 32,
		"5xl": 40,
		"6xl": 48,
	},
	lineHeight: {
		xs: 16,
		sm: 20,
		md: 24,
		true: 24,
		lg: 28,
		xl: 28,
		"2xl": 32,
		"3xl": 36,
		"4xl": 40,
		"5xl": 44,
		"6xl": 48,
	},
	weight: {
		regular: "400",
		medium: "500",
		semibold: "600",
		bold: "700",
	},
	letterSpacing: {
		xs: -0.5,
		sm: -0.25,
		md: 0,
		true: 0,
		lg: 0.25,
		xl: 0.5,
	},
	face: {
		400: { normal: "Inter-Regular" },
		500: { normal: "Inter-Medium" },
		600: { normal: "Inter-SemiBold" },
		700: { normal: "Inter-Bold" },
	},
});

export const allFonts = {
	heading: interFont,
	//subHeading: subHeadingFont,
	body: interFont,
	//button: buttonFont,
};
