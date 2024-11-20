import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Customer} from "../../dtos/Customer.ts";

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
            action.payload = action.payload.filter(c => !!c.no);
            state.customers = action.payload;
        },
        addCustomer: (state, action: PayloadAction<Customer>) => {
            if (!action.payload.no) return;
            state.customers.push(action.payload);
        },
        updateCustomer: (state, action: PayloadAction<Customer>) => {
            if (!action.payload.no) return;
            const index = state.customers.findIndex(c => c.no === action.payload.no);
            if (index !== -1) {
                state.customers[index] = action.payload;
            }
        },
        deleteCustomer: (state, action: PayloadAction<string>) => {
            state.customers = state.customers.filter(c => c.no !== action.payload);
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