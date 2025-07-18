import { zustandMmkvStorage } from "@/store/storage";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { useEffect } from "react";
import type { Address } from "viem";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AppState {
	hasAccount: boolean;
	isUnlocked: boolean;
	testnetEnabled?: boolean; // Optional property for testnet
	user: {
		uid: string;
		name?: string; // Optional property for user full name
		email?: string;
		phoneNumber?: string;
		eoaAddress?: Address;
		mainAddress?: Address;
	};
	setHasAccount: (value: boolean) => void;
	setIsUnlocked: (value: boolean) => void;
	setTestnetEnabled: (value: boolean) => void;
	setUser: (user: {
		uid: string;
		name?: string;
		email?: string;
		phoneNumber?: string;
	}) => void;
	setUserAddresses: (eoaAddress?: Address, mainAddress?: Address) => void;
}

const initialAppState = {
	hasAccount: false,
	isUnlocked: false,
	testnetEnabled: false, // Default to false, can be set later
	user: {
		uid: "",
		name: "",
		email: undefined,
		phoneNumber: undefined,
		eoaAddress: undefined,
		mainAddress: undefined,
	},
};

export const useAppState = create<AppState>()(
	persist(
		(set, get) => ({
			...initialAppState,
			setHasAccount: (value) => set({ hasAccount: value }),
			setIsUnlocked: (value) => set({ isUnlocked: value }),
			setTestnetEnabled: (value) => set({ testnetEnabled: value }),
			setUser: (user) => set({ user }),
			setUserAddresses: (eoaAddress, mainAddress) =>
				set((state) => ({
					user: {
						...state.user,
						eoaAddress,
						mainAddress,
					},
				})),
		}),
		{
			name: "app-state",
			storage: createJSONStorage(() => zustandMmkvStorage),
			version: 1,

			partialize: (state) => ({
				hasAccount: state.hasAccount,
				user: state.user,
			}),
		},
	),
);

export const useHasAccount = () => {
	useEffect(() => {
		// Try to load user from storage first
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
			const thisUser = useAppState.getState().user;
			//console.log("Auth state changed:", user);
			useAppState.getState().setHasAccount(!!user);
			if (user) {
				const { uid, displayName, email, phoneNumber } = user;
				useAppState.getState().setUser({
					...thisUser,
					uid,
					name: displayName || undefined,
					email: email || undefined,
					phoneNumber: phoneNumber || undefined,
				});
			}
		});

		return subscriber; // unsubscribe on unmount
	}, []);
	return useAppState((state) => state.hasAccount);
};
