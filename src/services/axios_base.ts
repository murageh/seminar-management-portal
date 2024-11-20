import axios from 'axios';
import {ErrorResponse} from "../dtos/AppResponse.ts";
import {toast} from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASE_URL as string | undefined;
if (!baseURL) {
    throw new Error('API base URL not found in environment variables.');
}

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle global errors and specific error codes
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (!error.response) {
                // network error
                error.errorStatus = 'Error: Network Error';
            }
            if (error.toJSON().message === 'Network Error') {
                error.errorStatus = 'Could not reach the server.';
            }

            const errorResponse: ErrorResponse = error.response.data;
            const statusCode = error.response.status;

            switch (statusCode) {
                case 401:
                    console.error('Unauthorized access - perhaps you need to log in?');
                    // Handle 401 errors (Unauthorized)
                    toast.warning('Unauthorized access - perhaps you need to log in?');
                    break;
                case 403:
                    console.error('Forbidden - you do not have permission to access this resource.');
                    // Handle 403 errors (Forbidden)
                    break;
                case 404:
                    console.error('Resource not found.');
                    // Handle 404 errors (Not Found)
                    break;
                case 500:
                    console.error('Internal server error.');
                    // Handle 500 errors (Internal Server Error)
                    break;
                default:
                    console.error(`Error: ${errorResponse.message}`);
                // Handle other errors
            }
        }
        return Promise.reject(error);
    }
);

// Function to update the token
// export const updateToken = (newToken: string) => {
//     localStorage.setItem('jwtToken', newToken);
//     sessionStorage.setItem('jwtToken', newToken);
// };

export default axiosInstance;