import {Navigate, useNavigate, useOutletContext, useParams} from "react-router-dom";
import React from "react";
import Button from "../../components/base/Button.tsx";
import {useAppSelector} from "../../state/hooks.ts";
import PropertyTable from "../../components/base/PropertyTable.tsx";
import {DashboardLayoutOutletContext} from "../../layouts/DashboardLayout.tsx";
import {PageHeading} from "../../components/base/PageHeading.tsx";
import {formatDate} from "../../utils";

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
        {property: "Starting Date", value: formatDate(seminarHeader?.starting_Date || '')},
        {property: "Duration", value: seminarHeader?.duration.toString() || ''},
        {property: "Maximum Participants", value: seminarHeader?.maximum_Participants.toString() || ''},
        {property: "Registered Participants", value: seminarHeader?.registered_Participants.toString() || ''},
        {property: "Status", value: seminarHeader?.status || ''}
    ];

    const isSeminarClosed = seminarHeader?.status === "Closed";

    return (
        <>
            <div className="flex-1 w-full mx-auto p-4 bg-white rounded-lg shadow-md">
                <PageHeading loading={loading} heading={"Seminar Information"} onClick={() => refresh()}/>
                {
                    (isSeminarClosed && !loading) ?
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                             role="alert">
                            <p className="text-base text-center font-normal mb-4">
                                This seminar is closed for registration. You can view your registration details below.
                            </p>
                            <Button type="button" variant="primary" onClick={handleClick}>
                                View my registration
                            </Button>
                        </div> : null
                }
                <PropertyTable data={loading ? [] : propertyData}/>
                <div className="flex justify-end space-x-4 mt-4">
                    <Button type="button" variant="primary"
                            disabled={isSeminarClosed || loading}
                            onClick={handleClick}>
                        {
                            isSeminarClosed ? 'This Seminar is closed' :
                                activeRegistration ? 'View my registration' : 'Register for this Seminar'
                        }
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SeminarDetail;