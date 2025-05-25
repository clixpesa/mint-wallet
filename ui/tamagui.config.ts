import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "@tamagui/core";
import { themes } from "./theme/themes";
import { tokens } from "./theme/tokens";

export const config = createTamagui({ ...defaultConfig, themes, tokens });

export type Conf = typeof config;

// ensure types work
declare module "tamagui" {
	interface TamaguiCustomConfig extends Conf {}
}
