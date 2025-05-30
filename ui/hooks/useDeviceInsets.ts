import type { EdgeInsets } from "react-native-safe-area-context";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tokens } from "../theme/tokens";

export function useDeviceInsets(): EdgeInsets {
	const insets = useSafeAreaInsets();

	if (insets.bottom === 0) {
		// Add bottom padding on devices which don't have on-screen navigation bar
		insets.bottom = tokens.space.vl.val;
	}

	return insets;
}
