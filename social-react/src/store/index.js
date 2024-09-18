import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import auth from "../slices/auth";
import { api } from "../slices/apiSlice";

const persistConfig = {
    key: 'root',
    safelist: ['auth', 'posts', 'users','api'],
    storage,
    version: 1,
    stateReconciler: autoMergeLevel2
}

const rootReducer = combineReducers({
    auth: auth,
    [api.reducerPath]: api.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
    devTools: true
})

export const persistedStore = persistStore(store);