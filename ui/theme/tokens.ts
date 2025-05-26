import { createTokens } from "tamagui";
import { colors } from "./colors";
import { fonts } from "./fonts";

const spacing = {
	none: 0,
	spacing1: 1,
	spacing2: 2,
	spacing4: 4,
	spacing6: 6,
	spacing8: 8,
	spacing12: 12,
	spacing16: 16,
	spacing18: 18,
	spacing20: 20,
	spacing24: 24,
	spacing28: 28,
	spacing32: 32,
	spacing36: 36,
	spacing40: 40,
	spacing48: 48,
	spacing60: 60,
};

const padding = {
	padding6: spacing.spacing6,
	padding8: spacing.spacing8,
	padding12: spacing.spacing12,
	padding16: spacing.spacing16,
	padding20: spacing.spacing20,
	padding36: spacing.spacing36,
};

const gap = {
	gap4: spacing.spacing4,
	gap8: spacing.spacing8,
	gap12: spacing.spacing12,
	gap16: spacing.spacing16,
	gap20: spacing.spacing20,
	gap24: spacing.spacing24,
	gap32: spacing.spacing32,
	gap36: spacing.spacing36,
};

const borderRadii = {
	none: 0,
	rounded4: 4,
	rounded6: 6,
	rounded8: 8,
	rounded12: 12,
	rounded16: 16,
	rounded20: 20,
	rounded24: 24,
	rounded32: 32,
	roundedFull: 999999,
};

const size = {
	none: 0,
	size1: 1,
	size2: 2,
	size4: 4,
	size6: 6,
	size8: 8,
	size12: 12,
	size16: 16,
	size18: 18,
	size20: 20,
	size24: 24,
	size28: 28,
	size32: 32,
	size36: 36,
	size40: 40,
	size48: 48,
	size60: 60,
	size64: 64,
	size72: 72,
	size80: 80,
	size96: 96,
	size100: 100,
	true: 16,
};

const fontSize = {
	heading1: fonts.heading1.fontSize,
	heading2: fonts.heading2.fontSize,
	heading3: fonts.heading3.fontSize,
	subheading1: fonts.subheading1.fontSize,
	subheading2: fonts.subheading2.fontSize,
	body1: fonts.body1.fontSize,
	body2: fonts.body2.fontSize,
	body3: fonts.body3.fontSize,
	body4: fonts.body4.fontSize,
	buttonLabel1: fonts.buttonLabel1.fontSize,
	buttonLabel2: fonts.buttonLabel2.fontSize,
	buttonLabel3: fonts.buttonLabel3.fontSize,
	buttonLabel4: fonts.buttonLabel4.fontSize,
	monospace: fonts.monospace.fontSize,
	true: fonts.body2.fontSize,
};

const space = { ...spacing, ...padding, ...gap, true: spacing.spacing8 };
const radius = { ...borderRadii, true: borderRadii.rounded8 };

export const tokens = createTokens({
	color: { ...colors },
	space: { ...space },
	radius: { ...radius },
	font: { ...fontSize },
	size: { ...size },
});
