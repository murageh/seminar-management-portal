import axiosInstance from './axios_base';
import {EmployeeResponse, ErrorResponse} from '../dtos/AppResponse.ts';
import {Employee} from '../dtos/Employee.ts';
import axios from 'axios';

// Get all employees
export const getEmployees = async (): Promise<EmployeeResponse> => {
    try {
        const response = await axiosInstance.get<EmployeeResponse>('/employee');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while fetching employees.');
    }
};

// Create a new employee
// TODO: Update type of newEmployee once implemented
export const createEmployee = async (newEmployee: any): Promise<EmployeeResponse> => {
    try {
        const response = await axiosInstance.post<EmployeeResponse>('/employee', newEmployee);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while creating the employee.');
    }
};

// Update an existing employee
export const updateEmployee = async (no: string, updatedEmployee: Employee): Promise<EmployeeResponse> => {
    try {
        const response = await axiosInstance.put<EmployeeResponse>(`/employee/${no}`, updatedEmployee);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while updating the employee.');
    }
};

// Delete an employee by no
export const deleteEmployee = async (no: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/employee/${no}`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while deleting the employee.');
    }
};