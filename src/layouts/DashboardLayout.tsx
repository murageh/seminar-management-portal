import MainSidebar from './MainSidebar.tsx';
import TopNav from './TopNav.tsx';
import {Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../state/hooks.ts";
import React, {useEffect} from "react";
import * as seminarSlice from "../state/features/seminarHeaderSlice.ts";
import {setLoading, setSeminarHeaders} from "../state/features/seminarHeaderSlice.ts";
import * as seminarService from "../services/seminarService.ts";
import * as customerService from "../services/customerService.ts";
import {setCustomer} from "../state/features/customerSlice.ts";
import * as authSlice from "../state/features/authSlice.ts";
import {toast} from "react-toastify";
import BreadCrumbs from "./BreadCrumbs.tsx";
import {FullScreenLoader} from "../components/loaders/Loaders.tsx";

export type DashboardLayoutOutletContext = {
    refresh: () => void;
    refreshSeminars: () => void;
    refreshRegistrations: () => void;
    fetchAndUpdateSeminarHeader: (no: string) => void;
}

const DashboardLayout = () => {
    const {user, loading: authLoading} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [refreshTracker, setRefreshTracker] = React.useState(0);
    const [rf, setRefreshSeminars] = React.useState(0);
    const [rr, setRefreshRegistrations] = React.useState(0);

    const refresh = React.useCallback(() => {
        setRefreshTracker(refreshTracker => refreshTracker + 1);
    }, []);
    const refreshRegistrations = React.useCallback(() => {
        setRefreshRegistrations(refreshRegistrations => refreshRegistrations + 1);
    }, []);
    const refreshSeminars = React.useCallback(() => {
        setRefreshSeminars(refreshSeminars => refreshSeminars + 1);
    }, []);

    const fetchSeminarHeaders = React.useCallback(async () => {
        try {
            dispatch(setLoading(true));
            seminarService.getSeminarHeaders()
                .then((response) => {
                    dispatch(setSeminarHeaders(response.data));
                });
            if (user?.customer_No) {
                customerService.getCustomer(user?.customer_No)
                    .then((response) => {
                        dispatch(setCustomer(response.customer));
                    });
            }
        } catch (error) {
            console.error('Error fetching seminarHeaders:', error);
        }

        dispatch(setLoading(false));
    }, [dispatch, user?.customer_No]);

    const fetchAndUpdateSeminarHeader = React.useCallback(async (no: string) => {
        try {
            seminarService.getSeminarHeader(no)
                .then((response) => {
                    dispatch(seminarSlice.updateOrAddSeminarHeader(response.data));
                });
        } catch (error) {
            console.error('Error fetching seminarHeader:', error);
            toast.error('Error fetching seminar header');
        }
    }, [dispatch]);

    const fetchRegistrations = React.useCallback(async () => {
        try {
            if (!user) return;
            dispatch(seminarSlice.setLoading(true));
            seminarService.getMyRegistrations(user!.contact_No)
                .then((response) => {
                    dispatch(seminarSlice.setRegistrations(response.data));
                }).finally(() => {
                dispatch(seminarSlice.setLoading(false));
            })
            if (user?.customer_No) {
                customerService.getCustomer(user?.customer_No)
                    .then((response) => {
                        dispatch(setCustomer(response.customer));
                    }).finally(() => {
                    dispatch(authSlice.setLoading(false));
                });
            }
        } catch (error) {
            console.error('Error fetching registrations:', error);
            dispatch(seminarSlice.setLoading(false));
        }
    }, [dispatch, user]);

    useEffect(() => {
        void fetchSeminarHeaders();
    }, [fetchSeminarHeaders, refreshTracker, refreshSeminars]);

    useEffect(() => {
        void fetchRegistrations();
    }, [fetchRegistrations, refreshTracker, refreshRegistrations]);

    if (authLoading) {
        return <FullScreenLoader/>;
    }

    return (
        <>
            <div className="flex h-full">
                {/* Main Sidebar with icons */}
                <MainSidebar/>

                {/* Main content area */}
                <div className="mainContent flex-1 flex flex-col h-screen bg-gray-100">
                    {/* Top Navigation */}
                    <TopNav/>

                    <BreadCrumbs/>

                    {/* Content area */}
                    <div
                        className="dashContent overflow-auto flex-1 w-full flex flex-col justify-start h-0 items-start text-left p-12 pt-4">
                        <Outlet
                            context={{refresh, refreshSeminars, refreshRegistrations, fetchAndUpdateSeminarHeader}}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
