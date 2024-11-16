import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Employee} from '../../models/Employee';
import {RootState} from '../store';

interface EmployeeStore {
    employees: Employee[];
    error?: string;
}

const initialState: EmployeeStore = {
    employees: [],
    error: undefined,
};

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployees: (state, action: PayloadAction<Employee[]>) => {
            state.employees = action.payload;
        },
        addEmployee: (state, action: PayloadAction<Employee>) => {
            state.employees.push(action.payload);
        },
        updateEmployee: (state, action: PayloadAction<Employee>) => {
            const index = state.employees.findIndex(e => e.id === action.payload.id);
            if (index !== -1) {
                state.employees[index] = action.payload;
            }
        },
        deleteEmployee: (state, action: PayloadAction<string>) => {
            state.employees = state.employees.filter(e => e.id !== action.payload);
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
    setEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    setError,
    clearError,
} = employeeSlice.actions;

export const selectEmployees = (state: RootState) => state.employee.employees;
export const employeeError = (state: RootState) => state.employee.error;

export default employeeSlice.reducer;