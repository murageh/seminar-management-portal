import axiosInstance from './axios_base';
import {ErrorResponse, SeminarResponse} from '../dtos/AppResponse.ts';
import {Seminar} from '../dtos/Seminar.ts';
import axios from 'axios';

// Get all seminars
export const getSeminars = async (): Promise<SeminarResponse> => {
    try {
        const response = await axiosInstance.get<SeminarResponse>('/seminar');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while fetching seminars.');
    }
};

// Create a new seminar
// TODO: Update type of newSeminar once implemented
export const createSeminar = async (newSeminar: any): Promise<SeminarResponse> => {
    try {
        const response = await axiosInstance.post<SeminarResponse>('/seminar', newSeminar);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while creating the seminar.');
    }
};

// Update an existing seminar
export const updateSeminar = async (no: string, updatedSeminar: Seminar): Promise<SeminarResponse> => {
    try {
        const response = await axiosInstance.put<SeminarResponse>(`/seminar/${no}`, updatedSeminar);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while updating the seminar.');
    }
};

// Delete a seminar by no
export const deleteSeminar = async (no: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/seminar/${no}`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while deleting the seminar.');
    }
};