import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from '../state/features/authSlice';
// redux-persist
import {persistReducer, persistStore} from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'seminar-portal',
    storage: localStorage,
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
    auth: authSlice,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred types
export type AppDispatch = typeof store.dispatch;