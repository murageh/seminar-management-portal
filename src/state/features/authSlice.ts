// Need to use the React-specific entry point to import `createApi`
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../dtos/User.ts";
import {RootState} from "../store.ts";

interface AuthStore {
    loggedIn: boolean;
    user: User | null;
    token: string | null;
    error?: string;
}

const initialState: AuthStore = {
    loggedIn: false,
    user: null,
    token: null,
    error: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loggedIn = true;
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
            if (state.user && state.token) {
                state.loggedIn = true;
            }
        },
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
        clearError: (state) => {
            state.error = undefined;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.user = null;
            state.token = null;
            if (typeof window !== "undefined") {
                sessionStorage.removeItem('token')
            }
        }
    },
});

export const {
    updateUser,
    setToken,
    setLoggedIn,
    logout,
} = authSlice.actions;

export const isLoggedIn = (state: RootState) => state.auth.loggedIn;
export const isUserAdmin = (state: RootState) => state.auth.user?.role.split(",").includes("admin");
export const authError = (state: RootState) => state.auth.error;

export default authSlice.reducer;