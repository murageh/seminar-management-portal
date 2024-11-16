import React, {useEffect, useState} from 'react';
import SeminarTable from '../layouts/tables/SeminarTable';
import axios from 'axios';
import {Seminar} from '../dtos/Seminar';

export const SeminarPage = () => {
    const [seminars, setSeminars] = useState<Seminar[]>([]);

    useEffect(() => {
        const fetchSeminars = async () => {
            try {
                // TODO: Change this
                const response = await axios.get<Seminar[]>('/api/seminars');
                setSeminars(response.data);
            } catch (error) {
                console.error('Error fetching seminars:', error);
            }
        };

        fetchSeminars();
    }, []);

    return (
        <div className="text-left">
            <h1 className="text-3xl font-bold">Seminars</h1>
            <div className="mt-8">
                <SeminarTable seminars={seminars}/>
            </div>
        </div>
    );
};