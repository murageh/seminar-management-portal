import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Customer} from '../../models/Customer';
import {RootState} from '../store';

interface CustomerStore {
    customers: Customer[];
    error?: string;
}

const initialState: CustomerStore = {
    customers: [],
    error: undefined,
};

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomers: (state, action: PayloadAction<Customer[]>) => {
            state.customers = action.payload;
        },
        addCustomer: (state, action: PayloadAction<Customer>) => {
            state.customers.push(action.payload);
        },
        updateCustomer: (state, action: PayloadAction<Customer>) => {
            const index = state.customers.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.customers[index] = action.payload;
            }
        },
        deleteCustomer: (state, action: PayloadAction<string>) => {
            state.customers = state.customers.filter(c => c.id !== action.payload);
        },
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = undefined;
        },
    },
});

export const {
    setCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    setError,
    clearError,
} = customerSlice.actions;

export const selectCustomers = (state: RootState) => state.customer.customers;
export const customerError = (state: RootState) => state.customer.error;

export default customerSlice.reducer;