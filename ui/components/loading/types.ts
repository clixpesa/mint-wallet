import type { JSX } from "react";
import type { ColorTokens, StackProps } from "tamagui";

export type SpinningLoaderProps = {
	size?: number;
	disabled?: boolean;
	color?: ColorTokens;
	unstyled?: boolean;
};

export type SkeletonProps = {
  children: JSX.Element
  contrast?: boolean
  disabled?: boolean
}

export type ShineProps = {
  disabled?: boolean
  children: JSX.Element
} & Omit<StackProps, 'children'>
