import {useNavigate, useParams} from "react-router-dom";
import React from "react";
import * as seminarService from "../../services/seminarService.ts";
import Button from "../../components/base/Button.tsx";
import {useAppDispatch, useAppSelector} from "../../state/hooks.ts";
import PropertyTable from "../../components/base/PropertyTable.tsx";
import {updateOrAddSeminarHeader} from "../../state/features/seminarHeaderSlice.ts";

const SeminarDetail: React.FC = () => {
    const navigate = useNavigate();
    const {no} = useParams<{ no: string }>();
    const {seminarHeaders} = useAppSelector(state => state.seminar);
    const dispatch = useAppDispatch();
    const seminarHeader = seminarHeaders.find(s => s.no === no);

    React.useEffect(() => {
        if (!seminarHeader && !no) {
            navigate('/dashboard/seminars', {replace: true});
            return;
        }

        if (!seminarHeader && no) {
            seminarService.getSeminarHeader(no)
                .then((response) => {
                    dispatch(updateOrAddSeminarHeader(response.data));
                });
        }
    }, []);


    const propertyData = [
        {property: "Seminar No", value: seminarHeader?.no || ''},
        {property: "Name", value: seminarHeader?.seminar_Name || ''},
        {property: "Starting Date", value: seminarHeader?.starting_Date || ''},
        {property: "Duration", value: seminarHeader?.duration.toString() || ''},
        {property: "Maximum Participants", value: seminarHeader?.maximum_Participants.toString() || ''},
        {property: "Registered Participants", value: seminarHeader?.registered_Participants.toString() || ''},
        {property: "Status", value: seminarHeader?.status || ''}
    ];

    return (
        <div className="flex-1 w-full mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">SeminarHeader Information</h1>
            <PropertyTable data={propertyData}/>
            <div className="flex justify-end space-x-4 mt-4">
                <Button type="button" variant="secondary" onClick={() => navigate('/dashboard/seminars')}>
                    Back
                </Button>
                <Button type="button" variant="primary"
                        onClick={() => navigate(`/dashboard/seminars/register/${seminarHeader?.no}`)}>
                    Register for this Seminar
                </Button>
            </div>
        </div>
    );
};

export default SeminarDetail;