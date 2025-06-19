import { zustandMmkvStorage } from "@/store/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AppState {
	hasAccount: boolean;
	isUnlocked: boolean;
	testnetEnabled?: boolean; // Optional property for testnet
	setHasAccount: (value: boolean) => void;
	setIsUnlocked: (value: boolean) => void;
	setTestnetEnabled: (value: boolean) => void;
}

const initialAppState = {
	hasAccount: false,
	isUnlocked: false,
	testnetEnabled: false,
};

export const useAppState = create<AppState>()(
	persist(
		(set, get) => ({
			...initialAppState,
			setHasAccount: (value) => set({ hasAccount: value }),
			setIsUnlocked: (value) => set({ isUnlocked: value }),
			setTestnetEnabled: (value) => set({ testnetEnabled: value }),
		}),
		{
			name: "app-state",
			storage: createJSONStorage(() => zustandMmkvStorage),
			version: 1,

			partialize: (state) => ({
				hasAccount: state.hasAccount,
				testnetEnabled: state.testnetEnabled,
			}),
		},
	),
);
