import React from 'react';
import {SeminarHeader} from "../../dtos/SeminarHeader.ts";
import TableBase, {TableColumn} from "../../components/base/TableBase.tsx";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../state/hooks.ts";

interface SeminarTableProps {
    seminarHeaders: SeminarHeader[];
}

const SeminarHeaderTable: React.FC<SeminarTableProps> = ({seminarHeaders}) => {
    const {loading} = useAppSelector(state => state.seminar);
    const navigate = useNavigate();

    const handleRowClick = (seminar: SeminarHeader) => {
        navigate(`/dashboard/seminars/${seminar.no}`);
    };

    const columns: TableColumn<SeminarHeader>[] = [
        {header: 'No', accessor: 'no', underline: 'dashed'},
        {header: 'Name', accessor: 'seminar_Name'},
        {header: 'Starting Date', accessor: 'starting_Date'},
        {header: 'Duration', accessor: 'duration'},
        {header: 'Status', accessor: 'status'},
        {header: 'Maximum Participants', accessor: 'maximum_Participants'},
        {header: 'Registered Participants', accessor: 'registered_Participants'}
    ];

    return <TableBase data={seminarHeaders} columns={columns} onRowClick={handleRowClick} loading={loading}/>;
};

export default SeminarHeaderTable;