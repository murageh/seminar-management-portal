import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Customer} from "../../dtos/Customer.ts";

interface CustomerStore {
    customer: Customer | null;
    error?: string;
    loading: boolean;
}

const initialState: CustomerStore = {
    customer: null,
    error: undefined,
    loading: false,
};

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomer: (state, action: PayloadAction<Customer>) => {
            if (!action.payload?.no) return;
            state.customer = action.payload;
        },
        clearCustomer: (state) => {
            state.customer = null;
        },
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = undefined;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    },
});

export const {
    setCustomer,
    clearCustomer,
    setError,
    clearError,
    setLoading
} = customerSlice.actions;

export const selectCustomers = (state: RootState) => state.customer.customer;
export const customerError = (state: RootState) => state.customer.error;

export default customerSlice.reducer;