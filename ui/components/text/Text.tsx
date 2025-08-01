import type { JSX, PropsWithChildren, ReactNode } from "react";
import React from "react";
import {
	Text as BaseText,
	type GetProps,
	Stack,
	YStack,
	isWeb,
	styled,
} from "tamagui";
import { Skeleton } from "../loading/Skeleton.native";
import { HiddenFromScreenReaders } from "./HiddenFromScreenReaders";
import { useEnableFontScaling } from "./useEnableFontScaling";

export const TextFrame = styled(BaseText, {
	fontFamily: "$body",
	wordWrap: "break-word",

	variants: {
		variant: {
			heading1: {
				fontFamily: "$heading",
				fontSize: "$lg",
				lineHeight: "$lg",
				fontWeight: "$rg",
				maxFontSizeMultiplier: 1.2,
			},
			heading2: {
				fontFamily: "$heading",
				fontSize: "$md",
				lineHeight: "$md",
				fontWeight: "$rg",
				maxFontSizeMultiplier: 1.2,
			},
			heading3: {
				fontFamily: "$heading",
				fontSize: "$sm",
				lineHeight: "$sm",
				fontWeight: "$rg",
				maxFontSizeMultiplier: 1.2,
			},
			subHeading1: {
				fontFamily: "$subHeading",
				fontSize: "$lg",
				lineHeight: "$lg",
				fontWeight: "$md",
				maxFontSizeMultiplier: 1.2,
			},
			subHeading2: {
				fontFamily: "$subHeading",
				fontSize: "$sm",
				lineHeight: "$sm",
				fontWeight: "$md",
				maxFontSizeMultiplier: 1.4,
			},
			body1: {
				fontFamily: "$body",
				fontSize: "$lg",
				lineHeight: "$lg",
				fontWeight: "$rg",
				maxFontSizeMultiplier: 1.4,
			},
			body2: {
				fontFamily: "$body",
				fontSize: "$md",
				lineHeight: "$md",
				fontWeight: "$rg",
				maxFontSizeMultiplier: 1.4,
			},
			body3: {
				fontFamily: "$body",
				fontSize: "$sm",
				lineHeight: "$sm",
				fontWeight: "$rg",
				maxFontSizeMultiplier: 1.4,
			},
			body4: {
        fontFamily: '$body',
        fontSize: '$xs',
        lineHeight: '$xs',
        fontWeight: '$rg',
        maxFontSizeMultiplier: 1.4,
      },
      buttonLabel1: {
        fontFamily: '$button',
        fontSize: '$lg',
        lineHeight: '$lg',
        fontWeight: '$md',
        maxFontSizeMultiplier: 1.2,
      },
      buttonLabel2: {
        fontFamily: '$button',
        fontSize: '$md',
        lineHeight: '$md',
        fontWeight: '$md',
        maxFontSizeMultiplier: 1.2,
      },
      buttonLabel3: {
        fontFamily: '$button',
        fontSize: '$sm',
        lineHeight: '$sm',
        fontWeight: '$md',
        maxFontSizeMultiplier: 1.2,
      },
      buttonLabel4: {
        fontFamily: '$button',
        fontSize: '$xs',
        lineHeight: '$xs',
        fontWeight: '$md',
        maxFontSizeMultiplier: 1.2,
      },
      monospace: {
        fontFamily: '$body',
        fontSize:"$md",
        lineHeight: "$md",
        fontWeight: '$rg',
        maxFontSizeMultiplier: 1.4,
      },
		},
	} as const,

	defaultVariants: {
		variant: "body2",
	},
});

const Heading1 = styled(TextFrame, {
	tag: "h1",
});

const Heading2 = styled(TextFrame, {
	tag: "h2",
});

const Heading3 = styled(TextFrame, {
	tag: "h3",
});

type TextFrameProps = GetProps<typeof TextFrame>;

export type TextProps = TextFrameProps & {
	maxFontSizeMultiplier?: number;
	allowFontScaling?: boolean;
	loading?: boolean | "no-shimmer";
	loadingPlaceholderText?: string;
	title?: string;
	children?: ReactNode;
};

// Use this text component throughout the app instead of
// Default RN Text for theme support

export const TextPlaceholder = ({
	children,
}: PropsWithChildren<unknown>): JSX.Element => {
	return (
		<YStack items="center">
			<YStack items="center" position="relative">
				<HiddenFromScreenReaders>{children}</HiddenFromScreenReaders>
				<Stack
					bg={isWeb ? "$surface3" : "$surface2"}
					rounded="$full"
					b="5%"
					l={0}
					position="absolute"
					r={0}
					t="5%"
				/>
			</YStack>
		</YStack>
	);
};

export const TextLoaderWrapper = ({
	children,
	loadingShimmer,
}: { loadingShimmer?: boolean } & PropsWithChildren<unknown>): JSX.Element => {
	const inner = <TextPlaceholder>{children}</TextPlaceholder>;
	if (loadingShimmer) {
		return <Skeleton>{inner}</Skeleton>;
	}

	return inner;
};

const TEXT_COMPONENTS = {
	heading1: Heading1,
	heading2: Heading2,
	heading3: Heading3,
} as const;

const getTextComponent = (variant: TextProps["variant"]): typeof TextFrame => {
	return TEXT_COMPONENTS[variant as keyof typeof TEXT_COMPONENTS] ?? TextFrame;
};

/**
 * Use this component instead of the default React Native <Text> component anywhere text shows up throughout the app, so we can use the design system values for colors and sizes, and make sure all text looks and behaves the same way
 * @param loading Whether the text inside the component is still loading or not. Set this to true if whatever content goes inside the <Text> component is coming from a variable that might still be loading. This prop is optional and defaults to false. This prop can also be set to "no-shimmer" to enable a loading state without the shimmer effect.
 * @param loadingPlaceholderText - The text that the loader's size will be derived from. Pick something that's close to the same length as the final text is expected to be, e.g. if it's a ticker symbol, "XXX" might be a good placeholder text. This prop is optional and defaults to "000.00".
 */
// Create a styled component with the TextFrame
export const Text = React.forwardRef<typeof TextFrame, TextProps>(
	(
		{
			loading = false,
			allowFontScaling,
			loadingPlaceholderText = "000.00",
			children,
			...props
		},
		ref,
	) => {
		const enableFontScaling = useEnableFontScaling(allowFontScaling);
		const TextVariant = getTextComponent(props.variant);

		if (loading) {
			return (
				<TextLoaderWrapper loadingShimmer={loading !== "no-shimmer"}>
					<TextVariant
						ref={ref as any}
						allowFontScaling={enableFontScaling}
						color="$transparent"
						opacity={0}
						{...props}
					>
						{loadingPlaceholderText}
					</TextVariant>
				</TextLoaderWrapper>
			);
		}

		return (
			<TextVariant
				ref={ref as any}
				allowFontScaling={enableFontScaling}
				color="$neutral1"
				{...props}
			>
				{children}
			</TextVariant>
		);
	},
);

// Add the styleable property to the Text component for backward compatibility
Object.assign(Text, {
	styleable: TextFrame.styleable,
});

Text.displayName = "Text";
