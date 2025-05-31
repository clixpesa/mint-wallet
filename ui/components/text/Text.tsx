import type { JSX, PropsWithChildren, ReactNode, Ref } from "react";
import {
	Text as BaseText,
	type GetProps,
	Stack,
	YStack,
	isWeb,
	styled,
} from "tamagui";
import { Skeleton } from "../loading/Skeleton";
import { HiddenFromScreenReaders } from "./HiddenFromScreenReaders";
import { useEnableFontScaling } from "./useEnableFontScaling";

export const TextFrame = styled(BaseText, {
	fontFamily: "$body",
	wordWrap: "break-word",

	variants: {
		variant: {
			heading1: {
				fontFamily: "$heading",
				fontSize: "$5xl",
				lineHeight: "$6xl",
				fontWeight: "$medium",
				maxFontSizeMultiplier: 1.2,
			},
			heading2: {
				fontFamily: "$heading",
				fontSize: "$3xl",
				lineHeight: "$5xl",
				fontWeight: "$medium",
				maxFontSizeMultiplier: 1.2,
			},
			heading3: {
				fontFamily: "$heading",
				fontSize: "$xl",
				lineHeight: "$xl",
				fontWeight: "$medium",
				maxFontSizeMultiplier: 1.2,
			},
			subHeading1: {
				fontFamily: "$heading",
				fontSize: "$vl",
				lineHeight: "$vl",
				fontWeight: "$medium",
				maxFontSizeMultiplier: 1.2,
			},
			subHeading2: {
				fontFamily: "$heading",
				fontSize: "$lg",
				lineHeight: "$lg",
				fontWeight: "$medium",
				maxFontSizeMultiplier: 1.4,
			},
			body1: {
				fontFamily: "$body",
				fontSize: "$vl",
				lineHeight: "$vl",
				fontWeight: "$regular",
				maxFontSizeMultiplier: 1.4,
			},
			body2: {
				fontFamily: "$body",
				fontSize: "$lg",
				lineHeight: "$lg",
				fontWeight: "$regular",
				maxFontSizeMultiplier: 1.4,
			},
			body3: {
				fontFamily: "$body",
				fontSize: "$md",
				lineHeight: "$md",
				fontWeight: "$regular",
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
					bg={isWeb ? "$secondary" : "$secondaryHover"}
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
export const Text = TextFrame.styleable<TextProps>(
	(props: TextProps, ref: Ref<any>): JSX.Element => {
		const {
			loading = false,
			allowFontScaling,
			loadingPlaceholderText = "000.00",
			children,
			...rest
		} = props;
		const enableFontScaling = useEnableFontScaling(allowFontScaling);
		const TextComponent = getTextComponent(rest.variant);

		if (loading) {
			return (
				<TextLoaderWrapper loadingShimmer={loading !== "no-shimmer"}>
					<TextComponent
						ref={ref}
						allowFontScaling={enableFontScaling}
						color="$transparent"
						opacity={0}
						{...rest}
					>
						{/* Important that `children` isn't used or rendered by <Text> when `loading` is true, because if the child of a <Text> component is a dynamic variable that might not be finished fetching yet, it'll result in an error until it's finished loading. We use `loadingPlaceholderText` to set the size of the loading element instead. */}
						{loadingPlaceholderText}
					</TextComponent>
				</TextLoaderWrapper>
			);
		}

		return (
			<TextComponent
				ref={ref}
				allowFontScaling={enableFontScaling}
				color="$color"
				{...rest}
			>
				{children}
			</TextComponent>
		);
	},
);

Text.displayName = "Text";
