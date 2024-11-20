import React from 'react';
import {MyRegistration} from "../../dtos/MyRegistration.ts";
import TableBase, {TableColumn} from "../../components/base/TableBase.tsx";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../state/hooks.ts";

interface MyRegistrationsTableProps {
    registrations: MyRegistration[];
}

const SeminarHeaderTable: React.FC<MyRegistrationsTableProps> = ({registrations}) => {
    const {seminarHeaders} = useAppSelector(state => state.seminar);
    const navigate = useNavigate();

    const handleRowClick = (registration: MyRegistration) => {
        navigate(`/dashboard/seminars/${registration.lineNo}`);
    };

    const getSeminarName = React.useCallback((registration: MyRegistration) => {
        const seminar = seminarHeaders.find(s => s.seminar_No === registration.seminarNo);
        if (!seminar) {
            throw new Error(`Seminar with no ${registration.seminarNo} not found`);
        }
        return seminar?.seminar_Name;
    }, [seminarHeaders]);

    const columns: TableColumn<MyRegistration>[] = [
        {header: 'ID', accessor: 'lineNo', underline: 'dashed'},
        {header: 'Seminar Name', accessor: getSeminarName},
        {header: 'Registration Date', accessor: 'registrationDate'},
        {header: 'Confirmation Status', accessor: 'confirmationStatus'},
        {header: 'Amount', accessor: 'amount'},
    ];

    return <TableBase<MyRegistration> data={registrations} columns={columns} onRowClick={handleRowClick}/>;
};

export default SeminarHeaderTable;