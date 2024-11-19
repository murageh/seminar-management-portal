import React, {useEffect} from 'react';
import SeminarTable from '../../layouts/tables/SeminarTable.tsx';
import {useAppDispatch, useAppSelector} from "../../state/hooks.ts";
import * as seminarService from "../../services/seminarService.ts";
import * as customerService from "../../services/customerService.ts";
import {setGenPostingGroups, setSeminars, setVatPostingGroups} from "../../state/features/seminarSlice.ts";
import {setCustomers} from "../../state/features/customerSlice.ts";

export const SeminarPage = () => {
    const {seminars, error} = useAppSelector(state => state.seminar);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchSeminars = async () => {
            try {
                // TODO: Change this
                seminarService.getSeminars()
                    .then((response) => {
                        dispatch(setSeminars(response.data));
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
                console.error('Error fetching seminars:', error);
            }
        };

        fetchSeminars();
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold sticky top-0">Seminars</h1>
            <div className="mt-8 w-full flex-1 h-0 overflow-auto bg-white p-4 rounded-lg shadow-md">
                <SeminarTable seminars={seminars}/>
            </div>
        </>
    );
};