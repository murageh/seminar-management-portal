import axiosInstance from './axios_base';
import {ErrorResponse, UserResponse} from '../dtos/AppResponse.ts';
import {NewUserRequest, UpdateUserRequest} from "../dtos/AppRequest.ts";
import axios from "axios";

// Get user by username
export const getUser = async (username: string): Promise<UserResponse> => {
    try {
        const response = await axiosInstance.get<UserResponse>(`/user/${username}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while fetching the user.');
    }
};

// Create a new user
export const createUser = async (newUser: NewUserRequest): Promise<UserResponse> => {
    try {
        const response = await axiosInstance.post<UserResponse>('/users', newUser);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message || errorResponse.title);
        }
        throw new Error('An unexpected error occurred while creating the user.');
    }
};

// Update an existing user
export const updateUser = async (username: string, updatedUser: UpdateUserRequest): Promise<UserResponse> => {
    try {
        const response = await axiosInstance.put<UserResponse>(`/user/${username}`, updatedUser);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message || errorResponse.title);
        }
        throw new Error('An unexpected error occurred while updating the user.');
    }
};

// Delete a user by username
export const deleteUser = async (username: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/user/${username}`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while deleting the user.');
    }
};