import axiosInstance from './axios_base';
import {ErrorResponse, MyRegistrationsResponse, SeminarListResponse, SeminarResponse,} from '../dtos/AppResponse.ts';
import axios from 'axios';
import {NewSeminarRegistrationRequest} from "../dtos/AppRequest.ts";

// Get all seminarHeaders
export const getSeminarHeaders = async (): Promise<SeminarListResponse> => {
    try {
        const response = await axiosInstance.get<SeminarListResponse>('/seminar/AvailableSeminars');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while fetching seminar headers.');
    }
};

// Get seminar header by no
export const getSeminarHeader = async (seminarNo: string): Promise<SeminarResponse> => {
    try {
        const response = await axiosInstance.get<SeminarResponse>(`/seminar/AvailableSeminars/${seminarNo}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while fetching seminar headers.');
    }
};

// Create a new seminar registration
export const createSeminarRegistration = async (newRegistration: NewSeminarRegistrationRequest): Promise<SeminarResponse> => {
    try {
        const response = await axiosInstance.post<SeminarResponse>('/seminar/registration', newRegistration);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message || errorResponse.title);
        }
        throw new Error('An unexpected error occurred while creating the seminar registration.');
    }
};

// Update an existing registration
export const updateSeminarRegistration = async (semHeaderNo: string, lineNo: number, confirmed: boolean): Promise<SeminarResponse> => {
    try {
        const response = await axiosInstance.patch<SeminarResponse>(`/seminar/registration`, {
            semHeaderNo,
            lineNo,
            confirmed
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message || errorResponse.title);
        }
        throw new Error('An unexpected error occurred while updating the seminar registration.');
    }
};

// Get my registrations. Accepts seminarHeadNo and participantContactNo
export const getMyRegistrations = async (participantContactNo: string, seminarHeadNo?: string): Promise<MyRegistrationsResponse> => {
    try {
        const response = await axiosInstance.get<MyRegistrationsResponse>(`/seminar/MyRegistrations?participantContactNo=${participantContactNo}&seminarHeadNo=${seminarHeadNo}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while fetching my registrations.');
    }
};
