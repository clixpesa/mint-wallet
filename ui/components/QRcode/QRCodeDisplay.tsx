import { useThemeColors } from "@/ui/hooks/useThemeColors";
import type { QRCodeErrorCorrectionLevel } from "qrcode";
import { type PropsWithChildren, memo } from "react";
import type { ColorTokens } from "tamagui";
import { Stack } from "tamagui";
import { QRCode } from "./QRCode";

export type BaseQRProps = {
	ecl?: QRCodeErrorCorrectionLevel;
	size: number;
	color: string;
};

type AddressQRCodeProps = BaseQRProps & {
	address: Address;
	ecl: QRCodeErrorCorrectionLevel;
	backgroundColor?: string;
};

function AddressQRCode({
	address,
	ecl,
	size,
	backgroundColor,
	color,
}: AddressQRCodeProps): JSX.Element {
	const colors = useThemeColors();

	return (
		<QRCode
			backgroundColor={backgroundColor}
			color={color}
			ecl={ecl}
			overlayColor={colors.neutral1.val}
			size={size}
			value={address}
		/>
	);
}

type QRCodeDisplayProps = BaseQRProps & {
	encodedValue: string;
	containerBackgroundColor?: ColorTokens;
};

const _QRCodeDisplay = ({
	encodedValue,
	ecl = "H",
	size,
	color,
	containerBackgroundColor,
	children,
}: PropsWithChildren<QRCodeDisplayProps>): JSX.Element => {
	return (
		<Stack
			items="center"
			bg={containerBackgroundColor}
			justify="center"
			position="relative"
		>
			<AddressQRCode
				address={encodedValue}
				backgroundColor={containerBackgroundColor}
				color={color}
				ecl={ecl}
				size={size}
			/>
			<Stack
				items="center"
				bg="$transparent"
				rounded="$full"
				overflow="visible"
				pl="$3xs"
				position="absolute"
				pt="$3xs"
			>
				{children}
			</Stack>
		</Stack>
	);
};

export const QRCodeDisplay = memo(_QRCodeDisplay);
