import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useDeviceInsets } from "./useDeviceInsets";

/**
 * @param deviceHeight - The type of device to check the height against. Defaults to 800.
 * @returns true if run on the mobile app and the device height is smaller or equal to the height of the given device type minus the bottom inset.
 */
export const useIsShortMobileDevice = (deviceHeight: 800): boolean => {
	const { height } = useSafeAreaFrame();
	const insets = useDeviceInsets();

	const heightWithoutBottomInsets = deviceHeight - 20;

	return height - insets.bottom <= heightWithoutBottomInsets;
};
