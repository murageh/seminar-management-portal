import React from 'react';
import {useAppSelector} from "../../state/hooks.ts";
import MyRegistrationsTable from "../../layouts/tables/MyRegistrationsTable.tsx";
import FullScreenLoader from "../../components/loaders/FullScreenLoader.tsx";
import {useOutletContext} from "react-router-dom";
import {DashboardLayoutOutletContext} from "../../layouts/DashboardLayout.tsx";
import {RefreshButton} from "../../components/base/RefreshButton.tsx";

export const MyRegistrationsPage = () => {
    const {seminar: {registrations, loading: semLoading}, auth: {user}} = useAppSelector(state => state);
    const {refresh} = useOutletContext<DashboardLayoutOutletContext>();

    return (
        <>
            {
                semLoading ?
                    <FullScreenLoader/>
                    :
                    <>
                        {/*  Refresh button  */}
                        <RefreshButton onClick={() => refresh()}/>
                    </>
            }
            <h1 className="text-3xl font-bold sticky top-0">My registrations</h1>
            <div className="mt-8 w-full flex-1 h-0 overflow-auto bg-white p-4 rounded-lg shadow-md">
                <MyRegistrationsTable registrations={semLoading ? [] : registrations}/>
            </div>
        </>
    );
};