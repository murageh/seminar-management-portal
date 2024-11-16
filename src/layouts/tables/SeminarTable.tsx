import React from 'react';
import {toast} from "react-toastify";
import {Seminar} from "../../dtos/Seminar.ts";
import TableBase from "../../components/base/TableBase.tsx";

interface SeminarTableProps {
    seminars: Seminar[];
}

const SeminarTable: React.FC<SeminarTableProps> = ({seminars}) => {
    const handleRowClick = (seminar: Seminar) => {
        toast.info(`Seminar: ${seminar.name}`);
    };

    const columns = [
        {header: 'No', accessor: 'no', underline: 'dashed'},
        {header: 'Name', accessor: 'name'},
        {header: 'Duration', accessor: 'seminarDuration'},
        {header: 'Price', accessor: 'seminarPrice'},
        {header: 'Gen Prod Posting Group', accessor: 'gen_Prod_Posting_Group'},
        {header: 'VAT Prod Posting Group', accessor: 'vaT_Prod_Posting_Group'},
    ];

    return <TableBase data={seminars} columns={columns} onRowClick={handleRowClick}/>;
};

export default SeminarTable;