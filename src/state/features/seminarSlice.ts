import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Seminar} from '../../models/Seminar';
import {RootState} from '../store';

interface SeminarStore {
    seminars: Seminar[];
    error?: string;
}

const initialState: SeminarStore = {
    seminars: [],
    error: undefined,
};

export const seminarSlice = createSlice({
    name: 'seminar',
    initialState,
    reducers: {
        setSeminars: (state, action: PayloadAction<Seminar[]>) => {
            state.seminars = action.payload;
        },
        addSeminar: (state, action: PayloadAction<Seminar>) => {
            state.seminars.push(action.payload);
        },
        updateSeminar: (state, action: PayloadAction<Seminar>) => {
            const index = state.seminars.findIndex(s => s.no === action.payload.no);
            if (index !== -1) {
                state.seminars[index] = action.payload;
            }
        },
        deleteSeminar: (state, action: PayloadAction<string>) => {
            state.seminars = state.seminars.filter(s => s.no !== action.payload);
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
    setSeminars,
    addSeminar,
    updateSeminar,
    deleteSeminar,
    setError,
    clearError,
} = seminarSlice.actions;

export const selectSeminars = (state: RootState) => state.seminar.seminars;
export const seminarError = (state: RootState) => state.seminar.error;

export default seminarSlice.reducer;