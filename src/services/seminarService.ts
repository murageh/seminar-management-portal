import axiosInstance from './axios_base';
import {
    ContactsReponse,
    ErrorResponse,
    GenProdPostingGroupsResponse,
    SeminarListResponse,
    SeminarResponse,
    VATProdPostingGroupsResponse
} from '../dtos/AppResponse.ts';
import {Seminar} from '../dtos/Seminar.ts';
import axios from 'axios';

// Get all seminars
export const getSeminars = async (): Promise<SeminarListResponse> => {
    try {
        const response = await axiosInstance.get<SeminarListResponse>('/seminar');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while fetching seminars.');
    }
};

// Get seminar by no
export const getSeminar = async (seminarNo: string): Promise<SeminarResponse> => {
    try {
        const response = await axiosInstance.get<SeminarResponse>(`/seminar/${seminarNo}`);
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
export const createSeminar = async (newSeminar: any): Promise<SeminarListResponse> => {
    try {
        const response = await axiosInstance.post<SeminarListResponse>('/seminar', newSeminar);
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
export const updateSeminar = async (no: string, updatedSeminar: Seminar): Promise<SeminarListResponse> => {
    try {
        const response = await axiosInstance.put<SeminarListResponse>(`/seminar/${no}`, updatedSeminar);
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