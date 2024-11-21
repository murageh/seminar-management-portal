import {Navigate, Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../state/hooks.ts";
import React from "react";
import {logout, setLoading, setUser} from "../state/features/authSlice.ts";
import {toast} from "react-toastify";
import * as authService from "../services/authService.ts";
import moment from "moment";
import FullScreenLoader from "../components/loaders/FullScreenLoader.tsx";

export const ProtectedRoute = () => {
    // const navigate = useNavigate();
    const {loggedIn, user, token, loading: authLoading} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    // In the case that loggedIn=true but user=null, fetch user data
    React.useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                dispatch(setLoading(true));
                const userResponse = await authService.getProfile();
                if (userResponse.data) {
                    dispatch(setUser(userResponse.data));
                } else {
                    dispatch(logout());
                    toast.error("An error occurred while fetching user data. Please log in again.");
                }
                dispatch(setLoading(false));
            } catch (error: any) {
                dispatch(logout());
                toast.error(error.message || error);
                dispatch(setLoading(false));
            }
        }

        // check if token has expired
        if (loggedIn && user && token) {
            const tokenExpiration = moment(token.issuedAt).add(token.expiresIn, 'seconds');
            if (moment().isAfter(tokenExpiration)) {
                dispatch(logout());
                toast.error("Your session has expired. Please log in again.");
            }
        } else if (loggedIn && !user && token) {
            fetchUserProfile();
        } else if (loggedIn && (!user && !token)) {
            dispatch(logout());
        } else if (!loggedIn && (user || token)) {
            dispatch(logout());
        } else if (!loggedIn && (!user && !token)) {
            // do nothing
        }
    }, [dispatch, loggedIn, token, user]);

    if (authLoading) {
        return <FullScreenLoader/>;
    } else if (!loggedIn) {
        return <Navigate to='/auth/login'/>;
    } else return <Outlet/>
};
