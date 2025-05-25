import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "@tamagui/core";

export const config = createTamagui(defaultConfig);

export type Conf = typeof config;

// ensure types work
declare module "tamagui" {
	interface TamaguiCustomConfig extends Conf {}
}
