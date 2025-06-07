import { zustandMmkvStorage } from "@/store/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AppState {
  hasAccount: boolean;
  isUnlocked: boolean;
  setHasAccount: (value: boolean) => void;
  setIsUnlocked: (value: boolean) => void;
}

const initialAppState = {
  hasAccount: false,
  isUnlocked: false,
}

export const useAppState = create<AppState>()(
  persist((set, get) => ({
    ...initialAppState,
    setHasAccount: (value) => set({ hasAccount: value}),
    setIsUnlocked: (value) => set({ isUnlocked: value})
  }),
  {
    name: "app-state",
    storage: createJSONStorage(()=> zustandMmkvStorage),
    version: 1,

    partialize: (state) => ({hasAccount: state.hasAccount})
  },
  ),
)