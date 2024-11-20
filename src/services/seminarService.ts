import axiosInstance from './axios_base';
import {
    ContactsReponse,
    ErrorResponse,
    GenProdPostingGroupsResponse,
    SeminarListResponse,
    SeminarResponse,
    VATProdPostingGroupsResponse
} from '../dtos/AppResponse.ts';
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
export const updateSeminarRegistration = async (semNo: string, lineNo: string, confirmed: boolean): Promise<SeminarResponse> => {
    try {
        const response = await axiosInstance.patch<SeminarResponse>(`/seminar/registration`, {
            semNo,
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

// Get all VAT Product Posting Groups
export const getVATProdPostingGroups = async (): Promise<VATProdPostingGroupsResponse> => {
    try {
        const response = await axiosInstance.get<VATProdPostingGroupsResponse>('/seminar/VATProdPostingGroups');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while fetching VAT Product Posting Groups.');
    }
};

// Get all General Product Posting Groups
export const getGenProdPostingGroups = async (): Promise<GenProdPostingGroupsResponse> => {
    try {
        const response = await axiosInstance.get<GenProdPostingGroupsResponse>('/seminar/GenProdPostingGroups');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while fetching General Product Posting Groups.');
    }
};

// Get Contacts by Company Name
export const getContactsByCompanyNo = async (companyName: string): Promise<ContactsReponse> => {
    try {
        const response = await axiosInstance.get<ContactsReponse>(`/seminar/contacts/${companyName}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error(`An unexpected error occurred while fetching contacts from company "${companyName}"`);
    }
}