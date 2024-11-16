import React, {useEffect} from 'react';
import SeminarTable from '../layouts/tables/SeminarTable';
import {useAppDispatch, useAppSelector} from "../state/hooks.ts";
import * as seminarService from "../services/seminarService";
import {setSeminars} from "../state/features/seminarSlice.ts";

export const SeminarPage = () => {
    const {seminars, error} = useAppSelector(state => state.seminar);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchSeminars = async () => {
            try {
                // TODO: Change this
                const response = await seminarService.getSeminars();
                dispatch(setSeminars(response.data));
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