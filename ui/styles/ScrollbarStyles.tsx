import { useThemeColors } from "@/ui/hooks/useThemeColors";
import type { CSSProperties } from "react";
export function useScrollbarStyles(): CSSProperties {
	const colors = useThemeColors();
	return {
		"&::WebkitScrollbar": {
			backgroundColor: "transparent",
		},
		"&::WebkitScrollbarThumb": {
			backgroundColor: colors.secondary.val,
			borderRadius: "8px",
		},
		scrollbarWidth: "thin",
		scrollbarColor: `${colors.secondary.val} transparent`,
	} as CSSProperties;
}
