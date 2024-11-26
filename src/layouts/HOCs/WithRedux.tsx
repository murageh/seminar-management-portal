import React from "react";
import {Provider} from "react-redux";
import {persistor, store} from "../../state/store.ts";
import {PersistGate} from "redux-persist/integration/react";
import Loader from "../../components/loaders/Loaders.tsx";

/**
 * This component renders its children with the redux store
 * This is useful for client components that need to access the redux store.
 * @param children
 * @constructor
 */
export const WithRedux = ({children}: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loader/>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};