import axiosInstance from './axios_base';
import {ErrorResponse, LoginResponse, UserResponse} from '../dtos/AppResponse.ts';
import {LoginRequest, NewUserRequest} from "../dtos/AppRequest.ts";
import axios from "axios";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            console.log({errorResponse});
            throw new Error(errorResponse.message || errorResponse.title);
        }
        throw new Error('An unexpected error occurred during login.');
    }
};

export const register = async (credentials: NewUserRequest): Promise<UserResponse> => {
    try {
        const response = await axiosInstance.post<UserResponse>('/auth/register', credentials);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message || errorResponse.title);
        }
        throw new Error('An unexpected error occurred during registration.');
    }
};

export const getProfile = async (): Promise<UserResponse> => {
    try {
        const response = await axiosInstance.get<UserResponse>('/auth/profile');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred while fetching the user profile.');
    }
}

export const logout = async (): Promise<void> => {
    try {
        await axiosInstance.post('/auth/logout');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorResponse: ErrorResponse = error.response.data;
            throw new Error(errorResponse.message);
        }
        throw new Error('An unexpected error occurred during logout.');
    }
};