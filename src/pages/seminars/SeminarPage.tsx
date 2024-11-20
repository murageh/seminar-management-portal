import React, {useEffect} from 'react';
import SeminarHeaderTable from '../../layouts/tables/SeminarHeaderTable.tsx';
import {useAppDispatch, useAppSelector} from "../../state/hooks.ts";
import * as seminarService from "../../services/seminarService.ts";
import * as customerService from "../../services/customerService.ts";
import {setGenPostingGroups, setSeminarHeaders, setVatPostingGroups} from "../../state/features/seminarHeaderSlice.ts";
import {setCustomers} from "../../state/features/customerSlice.ts";

export const SeminarPage = () => {
    const {seminarHeaders, error} = useAppSelector(state => state.seminar);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchSeminarHeaders = async () => {
            try {
                // TODO: Change this
                seminarService.getSeminarHeaders()
                    .then((response) => {
                        dispatch(setSeminarHeaders(response.data));
                    });
                seminarService.getGenProdPostingGroups()
                    .then((response) => {
                        dispatch(setGenPostingGroups(response.data));
                    });
                seminarService.getVATProdPostingGroups()
                    .then((response) => {
                        dispatch(setVatPostingGroups(response.data));
                    });
                customerService.getCustomers()
                    .then((response) => {
                        dispatch(setCustomers(response.customers));
                    });
            } catch (error) {
                console.error('Error fetching seminarHeaders:', error);
            }
        };

        void fetchSeminarHeaders();
    }, [dispatch]);

    return (
        <>
            <h1 className="text-3xl font-bold sticky top-0">Available seminars</h1>
            <div className="mt-8 w-full flex-1 h-0 overflow-auto bg-white p-4 rounded-lg shadow-md">
                <SeminarHeaderTable seminarHeaders={seminarHeaders}/>
            </div>
        </>
    );
};