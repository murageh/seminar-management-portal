import axiosInstance from './axios_base';
import {CustomerResponse, ErrorResponse} from '../dtos/AppResponse.ts';
import {Customer} from '../dtos/Customer.ts';
import axios from 'axios';

// Get all customers
export const getCustomers = async (): Promise<CustomerResponse> => {
    try {
        const response = await axiosInstance.get<CustomerResponse>('/customers');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while fetching customers.');
    }
};

// Create a new customer
// TODO: Update type of newCustomer once implemented
export const createCustomer = async (newCustomer: any): Promise<CustomerResponse> => {
    try {
        const response = await axiosInstance.post<CustomerResponse>('/customers', newCustomer);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while creating the customer.');
    }
};

// Update an existing customer
export const updateCustomer = async (no: string, updatedCustomer: Customer): Promise<CustomerResponse> => {
    try {
        const response = await axiosInstance.put<CustomerResponse>(`/customers/${no}`, updatedCustomer);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while updating the customer.');
    }
};

// Delete a customer by no
export const deleteCustomer = async (no: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/customers/${no}`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while deleting the customer.');
    }
};