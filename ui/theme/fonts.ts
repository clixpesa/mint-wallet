import { createFont } from "@tamagui/core";

const interFont = createFont({
	family: "Inter, Helvetica, Arial, sans-serif",
	size: {
		xs: 4,
		vs: 6,
		sm: 8,
		md: 12,
		lg: 16,
		vl: 20,
		xl: 24,
		"2xl": 32,
		"3xl": 36,
		"4xl": 40,
		"5xl": 48,
		"6xl": 60,
		true: 16,
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
