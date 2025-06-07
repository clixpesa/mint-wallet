import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  createSlice
} from "@reduxjs/toolkit";

import { storeEffects } from "./effects";


const listenerMiddleware = createListenerMiddleware();

const reduxSlice = createSlice({
	name: "redux",
	initialState: null,
	reducers: {},
});

const rootReducer = combineReducers({
	redux: reduxSlice.reducer,
	//[blockscoutApi.reducerPath]: blockscoutApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(
			listenerMiddleware.middleware,
			//blockscoutApi.middleware,
		),
});

export type ReduxState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const listeners = [storeEffects]; // essentialListeners walletListeners //storageListeners
listeners.forEach((listener) => listener(listenerMiddleware.startListening));