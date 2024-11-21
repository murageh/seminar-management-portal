import React from 'react';
import {MyRegistration} from "../../dtos/MyRegistration.ts";
import TableBase, {TableColumn} from "../../components/base/TableBase.tsx";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../state/hooks.ts";
import * as seminarService from "../../services/seminarService.ts";
import {setRegistrations} from "../../state/features/seminarHeaderSlice.ts";
import {formatCurrency} from "../../utils";
import {FullScreenLoader} from "../../components/loaders/Loaders.tsx";

interface MyRegistrationsTableProps {
    registrations: MyRegistration[];
}

const SeminarHeaderTable: React.FC<MyRegistrationsTableProps> = ({registrations}) => {
    const {loading} = useAppSelector(state => state.seminar);
    const {user, loading: authLoading} = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (!user) return;
        // Fetch registrations
        const res = seminarService.getMyRegistrations(user!.contact_No);
        res.then((response) => {
            dispatch(setRegistrations(response.data));
        });
    }, [dispatch, user]);

    const handleRowClick = (registration: MyRegistration) => {
        navigate(
            `/dashboard/seminars/register/${registration.headerNo}?edit=true`,
            {
                state: {registration}
            }
        )
        ;
    };

    const columns: TableColumn<MyRegistration>[] = [
        {header: 'ID', accessor: 'lineNo', underline: 'dashed'},
        {header: 'Seminar Name', accessor: 'seminarName'},
        {header: 'Starting Date', accessor: 'startingDate'},
        {header: 'Confirmation Status', accessor: 'confirmationStatus'},
        {
            header: 'Amount (KES)', accessor: 'amount',
            format: formatCurrency
        },
    ];

    if (authLoading || loading) {
        return <FullScreenLoader/>;
    }

    return <TableBase<MyRegistration>
        data={registrations}
        columns={columns}
        onRowClick={handleRowClick}
        loading={loading || authLoading}
    />;
};

export default SeminarHeaderTable;