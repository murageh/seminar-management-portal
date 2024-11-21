import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../state/hooks.ts";
import * as employeeService from "../../services/employeeService.ts";
import {setEmployees} from "../../state/features/employeeSlice.ts";
import TableBase from "../../components/base/TableBase.tsx";
import {toast} from "react-toastify";
import {Employee} from "../../dtos/Employee.ts";

export const EmployeePage = () => {
    const {employees, error} = useAppSelector(state => state.employee);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await employeeService.getEmployees();
                dispatch(setEmployees(response.employees));
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const columns = [
        {header: 'No', accessor: 'no', underline: 'dashed'},
        {header: 'Resource No', accessor: 'resource_No'},
        {header: 'Full Name', accessor: 'fullName'},
    ];

    const handleRowClick = (employee: Employee) => {
        toast.info(`Employee: ${employee.fullName}`);
    }

    return (
        <>
            <h1 className="text-3xl font-bold sticky top-0">Employees</h1>
            <div className="mt-8 w-full flex-1 h-0 overflow-auto bg-white p-4 rounded-lg shadow-md">
                <TableBase data={employees} columns={columns} onRowClick={handleRowClick}/>
            </div>
        </>
    );
};