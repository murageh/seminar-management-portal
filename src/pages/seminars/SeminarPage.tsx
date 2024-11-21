import React from 'react';
import SeminarHeaderTable from '../../layouts/tables/SeminarHeaderTable.tsx';
import {useAppSelector} from "../../state/hooks.ts";
import {useOutletContext} from "react-router-dom";
import {DashboardLayoutOutletContext} from "../../layouts/DashboardLayout.tsx";
import FullScreenLoader from "../../components/loaders/FullScreenLoader.tsx";
import {RefreshButton} from "../../components/base/RefreshButton.tsx";

export const SeminarPage = () => {
    const {seminar: {seminarHeaders, loading}} = useAppSelector(state => state);
    const {refresh} = useOutletContext<DashboardLayoutOutletContext>();

    return (
        <>
            {
                loading ?
                    <FullScreenLoader/>
                    :
                    <>
                        {/*  Refresh button  */}
                        <RefreshButton onClick={() => refresh()}/>
                    </>
            }
            <h1 className="text-3xl font-bold sticky top-0">Available seminars</h1>
            <div className="mt-8 w-full flex-1 h-0 overflow-auto bg-white p-4 rounded-lg shadow-md">
                <SeminarHeaderTable seminarHeaders={seminarHeaders}/>
            </div>
        </>
    );
};