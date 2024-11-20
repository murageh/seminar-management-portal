import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {SeminarHeader} from "../../dtos/SeminarHeader.ts";
import {GenProdPostingGroup, VATProdPostingGroup} from "../../dtos/AppResponse.ts";

interface SeminarStore {
    seminarHeaders: SeminarHeader[];
    genPostingGroups: GenProdPostingGroup[];
    vatPostingGroups: VATProdPostingGroup[];
    error?: string;
}

const initialState: SeminarStore = {
    seminarHeaders: [],
    genPostingGroups: [],
    vatPostingGroups: [],
    error: undefined,
};

export const seminarHeaderSlice = createSlice({
    name: 'seminar',
    initialState,
    reducers: {
        setSeminarHeaders: (state, action: PayloadAction<SeminarHeader[]>) => {
            action.payload = action.payload.filter(s => !!s.no);
            state.seminarHeaders = action.payload;
        },
        addSeminarHeader: (state, action: PayloadAction<SeminarHeader>) => {
            if (!action.payload.no) return;
            state.seminarHeaders.push(action.payload);
        },
        updateOrAddSeminarHeader: (state, action: PayloadAction<SeminarHeader>) => {
            if (!action.payload.no) return;
            const index = state.seminarHeaders.findIndex(s => s.no === action.payload.no);
            if (index !== -1) {
                state.seminarHeaders[index] = action.payload;
            } else {
                state.seminarHeaders.push(action.payload);
            }
        },
        deleteSeminarHeader: (state, action: PayloadAction<string>) => {
            state.seminarHeaders = state.seminarHeaders.filter(s => s.no !== action.payload);
        },
        setGenPostingGroups: (state, action: PayloadAction<GenProdPostingGroup[]>) => {
            action.payload = action.payload.filter(g => !!g.code);
            state.genPostingGroups = action.payload;
        },
        setVatPostingGroups: (state, action: PayloadAction<VATProdPostingGroup[]>) => {
            action.payload = action.payload.filter(v => !!v.code);
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
    setSeminarHeaders,
    addSeminarHeader,
    updateOrAddSeminarHeader,
    deleteSeminarHeader,
    setGenPostingGroups,
    setVatPostingGroups,
    removeGenPostingGroup,
    removeVatPostingGroup,
    clearGenPostingGroups,
    clearVatPostingGroups,
    setError,
    clearError,
} = seminarHeaderSlice.actions;

export const selectSeminars = (state: RootState) => state.seminar.seminarHeaders;
export const seminarError = (state: RootState) => state.seminar.error;
export const selectGenPostingGroups = (state: RootState) => state.seminar.genPostingGroups;
export const selectVatPostingGroups = (state: RootState) => state.seminar.vatPostingGroups;

export default seminarHeaderSlice.reducer;