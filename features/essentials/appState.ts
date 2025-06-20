import { zustandMmkvStorage } from "@/store/storage";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { useEffect } from "react";
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
	testnetEnabled: true,
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
			}),
		},
	),
);

export const useHasAccount = () => {
	useEffect(() => {
		// Try to load user from storage first
		console.log("Checking for user");
		/*let storedUser: FirebaseAuthTypes.User | null = null;
		const getStoredUser = async () => {
			storedUser = await appStorage.getItem<FirebaseAuthTypes.User>("user");
		};
		getStoredUser();

		if (storedUser) {
			useAppState.getState().setHasAccount(true);
		}*/
		const subscriber = onAuthStateChanged(getAuth(), async (user) => {
			//if (user) await appStorage.setItem("user", user.toJSON());

			useAppState.getState().setHasAccount(!!user);
		});

		return subscriber; // unsubscribe on unmount
	}, []);
	return useAppState((state) => state.hasAccount);
};
