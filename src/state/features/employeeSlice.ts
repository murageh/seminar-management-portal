import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Employee} from "../../dtos/Employee.ts";

interface EmployeeStore {
    employees: Employee[];
    error?: string;
    loading: boolean;
}

const initialState: EmployeeStore = {
    employees: [],
    error: undefined,
    loading: false,
};

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployees: (state, action: PayloadAction<Employee[]>) => {
            if (!Array.isArray(action.payload)) return;
            action.payload = action.payload.filter(e => !!e.no);
            state.employees = action.payload;
        },
        addEmployee: (state, action: PayloadAction<Employee>) => {
            if (!action.payload?.no) return;
            state.employees.push(action.payload);
        },
        updateEmployee: (state, action: PayloadAction<Employee>) => {
            if (!action.payload?.no) return;
            const index = state.employees.findIndex(e => e.no === action.payload.no);
            if (index !== -1) {
                state.employees[index] = action.payload;
            }
        },
        deleteEmployee: (state, action: PayloadAction<string>) => {
            state.employees = state.employees.filter(e => e.no !== action.payload);
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
    setEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    setError,
    clearError,
    setLoading,
} = employeeSlice.actions;

export const selectEmployees = (state: RootState) => state.employee.employees;
export const employeeError = (state: RootState) => state.employee.error;

export default employeeSlice.reducer;