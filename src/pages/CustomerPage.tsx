import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../state/hooks.ts";
import * as customerService from "../services/customerService";
import {setCustomers} from "../state/features/customerSlice.ts";
import TableBase from "../components/base/TableBase.tsx";
import {toast} from "react-toastify";
import {Customer} from "../dtos/Customer.ts";

export const CustomerPage = () => {
    const {customers, error} = useAppSelector(state => state.customer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await customerService.getCustomers();
                dispatch(setCustomers(response.customers));
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const columns = [
        {header: 'No', accessor: 'no', underline: 'dashed'},
        {header: 'Name', accessor: 'name'},
        {header: 'Phone No', accessor: 'phone_No'},
        {header: 'Balance', accessor: 'balance_LCY'},
        {header: 'Country', accessor: 'country_Region_Code'},
    ];

    const handleRowClick = (customer: Customer) => {
        toast.info(`Customer: ${customer.name}`);
    };

    return (
        <>
            <h1 className="text-3xl font-bold sticky top-0">Customers</h1>
            <div className="mt-8 w-full flex-1 h-0 overflow-auto bg-white p-4 rounded-lg shadow-md">
                <TableBase data={customers} columns={columns} onRowClick={handleRowClick}/>
            </div>
        </>
    );
};

export default CustomerPage;