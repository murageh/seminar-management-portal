import {Action, combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from '../state/features/authSlice';
import seminarSlice from "./features/seminarHeaderSlice.ts";
import employeeSlice from "./features/employeeSlice";
import customerSlice from "./features/customerSlice";
// redux-persist
import {persistReducer, persistStore} from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistKey = 'seminar-portal';

const persistConfig = {
    key: persistKey,
    storage: localStorage,
    stateReconciler: autoMergeLevel2
};

const appReducer = combineReducers({
    auth: authSlice,
    seminar: seminarSlice,
    employee: employeeSlice,
    customer: customerSlice,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: Action) => {
    if (action.type === 'SIGNOUT_REQUEST') {
        // for all keys defined in the persistConfig(s)
        void localStorage.removeItem(`persist:${persistKey}`);
        // storage.removeItem('persist:otherKey')

        return appReducer(undefined, action);
    }

    return appReducer(state, action)
};

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