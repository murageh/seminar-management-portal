import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Seminar} from "../../dtos/Seminar.ts";
import {GenProdPostingGroup, VATProdPostingGroup} from "../../dtos/AppResponse.ts";

interface SeminarStore {
    seminars: Seminar[];
    genPostingGroups: GenProdPostingGroup[];
    vatPostingGroups: VATProdPostingGroup[];
    error?: string;
}

const initialState: SeminarStore = {
    seminars: [],
    genPostingGroups: [],
    vatPostingGroups: [],
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
        setGenPostingGroups: (state, action: PayloadAction<GenProdPostingGroup[]>) => {
            state.genPostingGroups = action.payload;
        },
        setVatPostingGroups: (state, action: PayloadAction<VATProdPostingGroup[]>) => {
            state.vatPostingGroups = action.payload;
        },
        removeGenPostingGroup: (state, action: PayloadAction<GenProdPostingGroup>) => {
            state.genPostingGroups = state.genPostingGroups.filter(g => g.code !== action.payload.code);
        },
        removeVatPostingGroup: (state, action: PayloadAction<VATProdPostingGroup>) => {
            state.vatPostingGroups = state.vatPostingGroups.filter(v => v.code !== action.payload.code);
        },
        clearGenPostingGroups: (state) => {
            state.genPostingGroups = [];
        },
        clearVatPostingGroups: (state) => {
            state.vatPostingGroups = [];
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
    setGenPostingGroups,
    setVatPostingGroups,
    removeGenPostingGroup,
    removeVatPostingGroup,
    clearGenPostingGroups,
    clearVatPostingGroups,
    setError,
    clearError,
} = seminarSlice.actions;

export const selectSeminars = (state: RootState) => state.seminar.seminars;
export const seminarError = (state: RootState) => state.seminar.error;
export const selectGenPostingGroups = (state: RootState) => state.seminar.genPostingGroups;
export const selectVatPostingGroups = (state: RootState) => state.seminar.vatPostingGroups;

export default seminarSlice.reducer;