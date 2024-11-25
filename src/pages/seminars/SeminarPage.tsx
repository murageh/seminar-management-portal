import React from 'react';
import SeminarHeaderTable from '../../layouts/tables/SeminarHeaderTable.tsx';
import {useAppSelector} from "../../state/hooks.ts";
import {useOutletContext} from "react-router-dom";
import {DashboardLayoutOutletContext} from "../../layouts/DashboardLayout.tsx";
import {PageHeading} from "../../components/base/PageHeading.tsx";

export const SeminarPage = () => {
    const {seminarHeaders, loading} = useAppSelector(state => state.seminar);
    const {refresh} = useOutletContext<DashboardLayoutOutletContext>();

    return (
        <>
            <PageHeading loading={loading} heading={"Available seminars"} onClick={() => refresh()}/>
            <div className="mt-8 w-full flex-1 h-0 overflow-auto bg-white p-4 rounded-lg shadow-md">
                <SeminarHeaderTable seminarHeaders={loading ? [] : seminarHeaders}/>
            </div>
        </>
    );
};