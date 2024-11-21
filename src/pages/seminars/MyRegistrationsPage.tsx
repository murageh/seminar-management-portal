import React from 'react';
import {useAppSelector} from "../../state/hooks.ts";
import MyRegistrationsTable from "../../layouts/tables/MyRegistrationsTable.tsx";
import {useOutletContext} from "react-router-dom";
import {DashboardLayoutOutletContext} from "../../layouts/DashboardLayout.tsx";
import {PageHeading} from "../../components/base/PageHeading.tsx";

export const MyRegistrationsPage = () => {
    const {
        seminar: {registrations, loading: semLoading},
        auth: {loading: authLoading}
    } = useAppSelector(state => state);
    const {refresh} = useOutletContext<DashboardLayoutOutletContext>();

    const loading = semLoading || authLoading;

    return (
        <>
            <PageHeading loading={loading} heading={"My registrations"} onClick={() => refresh()}/>
            <div className="mt-8 w-full flex-1 h-0 overflow-auto bg-white p-4 rounded-lg shadow-md">
                <MyRegistrationsTable registrations={loading ? [] : registrations}/>
            </div>
        </>
    );
};