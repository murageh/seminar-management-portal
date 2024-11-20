// Need to use the React-specific entry point to import `createApi`
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {JWTToken, User} from "../../dtos/User.ts";
import {RootState} from "../store.ts";

interface AuthStore {
    loggedIn: boolean;
    user: User | null;
    token: JWTToken | null;
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
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loggedIn = true;
        },
        setUserAndClearToken: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loggedIn = true;
            state.token = null;
        },
        setToken: (state, action: PayloadAction<JWTToken | null>) => {
            state.token = action.payload;
            state.loggedIn = !!state.token;
            localStorage.setItem("jwtToken", state.token?.token || "");
        },
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            if (!state.user && !state.token) {
                throw new Error("At least a user or token must be set before setting loggedIn");
            }
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
                // sessionStorage.removeItem('jwtToken');
                // localStorage.removeItem('jwtToken');
                // clearAllData();
            }
        }
    },
});

export const {
    setUser,
    setUserAndClearToken,
    setToken,
    setLoggedIn,
    logout,
} = authSlice.actions;

export const isLoggedIn = (state: RootState) => state.auth.loggedIn;
export const isUserAdmin = (state: RootState) => state.auth.user?.role.split(",").includes("admin");
export const authError = (state: RootState) => state.auth.error;

export default authSlice.reducer;