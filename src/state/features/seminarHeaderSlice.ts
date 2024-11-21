import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {SeminarHeader} from "../../dtos/SeminarHeader.ts";
import {MyRegistration} from "../../dtos/MyRegistration.ts";

interface SeminarStore {
    seminarHeaders: SeminarHeader[];
    registrations: MyRegistration[];
    error?: string;
    loading?: boolean;
}

const initialState: SeminarStore = {
    seminarHeaders: [],
    registrations: [],
    error: undefined,
    loading: false,
};

export const seminarHeaderSlice = createSlice({
    name: 'seminar',
    initialState,
    reducers: {
        setSeminarHeaders: (state, action: PayloadAction<SeminarHeader[]>) => {
            if (!Array.isArray(action.payload)) return;
            action.payload = action.payload.filter(s => !!s.no);
            state.seminarHeaders = action.payload;
        },
        setRegistrations: (state, action: PayloadAction<MyRegistration[]>) => {
            if (!Array.isArray(action.payload)) return;
            action.payload = action.payload.filter(r => !!r.seminarNo);
            state.registrations = action.payload;
        },
        addSeminarHeader: (state, action: PayloadAction<SeminarHeader>) => {
            if (!action.payload?.no) return;
            state.seminarHeaders.push(action.payload);
        },
        addRegistration: (state, action: PayloadAction<MyRegistration>) => {
            if (!action.payload?.seminarNo) return;
            state.registrations.push(action.payload);
        },
        updateOrAddSeminarHeader: (state, action: PayloadAction<SeminarHeader>) => {
            if (!action.payload?.no) return;
            const index = state.seminarHeaders.findIndex(s => s.no === action.payload.no);
            if (index !== -1) {
                state.seminarHeaders[index] = action.payload;
            } else {
                state.seminarHeaders.push(action.payload);
            }
        },
        UpdateOrAddRegistration: (state, action: PayloadAction<MyRegistration>) => {
            if (!action.payload?.seminarNo) return;
            const index = state.registrations.findIndex(r => r.seminarNo === action.payload.seminarNo);
            if (index !== -1) {
                state.registrations[index] = action.payload;
            } else {
                state.registrations.push(action.payload);
            }
        },
        deleteSeminarHeader: (state, action: PayloadAction<string>) => {
            state.seminarHeaders = state.seminarHeaders.filter(s => s.no !== action.payload);
        },
        deleteRegistration: (state, action: PayloadAction<string>) => {
            state.registrations = state.registrations.filter(r => r.seminarNo !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
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
    setRegistrations,
    addRegistration,
    UpdateOrAddRegistration,
    deleteRegistration,
    setLoading,
    setError,
    clearError,
} = seminarHeaderSlice.actions;

export const selectSeminars = (state: RootState) => state.seminar.seminarHeaders;
export const seminarError = (state: RootState) => state.seminar.error;

export default seminarHeaderSlice.reducer;