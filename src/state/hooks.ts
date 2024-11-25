import type {TypedUseSelectorHook} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from './store';

// For use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// specific to clear all the data in the store
export const clearAllData = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
};