import {Navigate, useNavigate, useOutletContext, useParams} from "react-router-dom";
import React from "react";
import Button from "../../components/base/Button.tsx";
import {useAppSelector} from "../../state/hooks.ts";
import PropertyTable from "../../components/base/PropertyTable.tsx";
import FullScreenLoader from "../../components/loaders/FullScreenLoader.tsx";
import {RefreshButton} from "../../components/base/RefreshButton.tsx";
import {DashboardLayoutOutletContext} from "../../layouts/DashboardLayout.tsx";

const SeminarDetail: React.FC = () => {
    const navigate = useNavigate();
    const {no} = useParams<{ no: string }>();
    const {seminarHeaders, registrations, loading} = useAppSelector(state => state.seminar);
    const seminarHeader = seminarHeaders.find(s => s.no === no);
    const {refresh, refreshSeminars} = useOutletContext<DashboardLayoutOutletContext>();
    const activeRegistration = registrations.find(r => r.seminarNo === seminarHeader?.seminar_No);

    if (!seminarHeader && !no) {
        return <Navigate to='/dashboard/seminars' replace={true}/>;
    }

    if (!seminarHeader && no) {
        refreshSeminars();
    }

    const handleClick = () => {
        if (activeRegistration) {
            navigate(`/dashboard/seminars/register/${activeRegistration.headerNo}?edit=true`);
        } else {
            navigate(`/dashboard/seminars/register/${seminarHeader?.no}`)
        }
    };

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
        <>
            {
                loading ?
                    <FullScreenLoader/>
                    :
                    <>
                        {/*  Refresh button  */}
                        <RefreshButton onClick={() => refresh()}/>
                    </>
            }
            <div className="flex-1 w-full mx-auto p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Seminar Information</h1>
                <PropertyTable data={propertyData}/>
                <div className="flex justify-end space-x-4 mt-4">
                    <Button type="button" variant="primary"
                            onClick={handleClick}>
                        {
                            activeRegistration ? 'View my registration' : 'Register for this Seminar'
                        }
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SeminarDetail;