import {useLocation, useNavigate, useOutletContext, useParams, useSearchParams} from "react-router-dom";
import React, {useState} from "react";
import {SeminarHeader} from "../../dtos/SeminarHeader.ts";
import * as seminarService from "../../services/seminarService.ts";
import {InputField} from "../../components/base/Inputs.tsx";
import Button from "../../components/base/Button.tsx";
import {Formik} from "formik";
import * as Yup from 'yup';
import {useAppSelector} from "../../state/hooks.ts";
import PropertyTable from "../../components/base/PropertyTable.tsx";
import {NewSeminarRegistrationRequest} from "../../dtos/AppRequest.ts";
import {toast} from "react-toastify";
import {MyRegistration} from "../../dtos/MyRegistration.ts";
import {DashboardLayoutOutletContext} from "../../layouts/DashboardLayout.tsx";
import {PageHeading} from "../../components/base/PageHeading.tsx";
import {formatDate} from "../../utils";

interface SeminarRegistrationFormProps {
    seminar?: SeminarHeader;
    mode?: "view" | "edit" | "create";
}

const SeminarRegistrationForm: React.FC<SeminarRegistrationFormProps> = () => {
    const navigate = useNavigate();
    const {no} = useParams<{ no: string }>();
    const {user, loading: authLoading} = useAppSelector(state => state.auth);
    const {seminarHeaders, loading: semLoading} = useAppSelector(state => state.seminar);
    const {loading: custLoading} = useAppSelector(state => state.customer);

    const {refresh, refreshSeminars, fetchAndUpdateSeminarHeader} = useOutletContext<DashboardLayoutOutletContext>();
    const [selectedSeminarNo, setSelectedSeminarNo] = useState<string | null>(no || null);
    const [searchParams, setSearchParams] = useSearchParams();

    let isEditMode = searchParams.get('edit') === 'true';
    const location = useLocation();
    const {registration} = location?.state as { registration?: MyRegistration } || {};
    if (isEditMode && !registration) {
        isEditMode = false;
    }

    const selectedSeminarHeader = seminarHeaders.find(s => s.no === selectedSeminarNo);

    React.useEffect(() => {
        if (!selectedSeminarNo) {
            refreshSeminars();
        } else {
            fetchAndUpdateSeminarHeader(selectedSeminarNo);
        }
    }, []);

    const initialValues: NewSeminarRegistrationRequest = {
        semNo: selectedSeminarNo || '',
        companyNo: user?.customer_No || '',
        participantContactNo: user?.contact_No || '',
        confirmed: registration?.confirmationStatus === 'Confirmed' || false
    };

    const validationSchema = Yup.object({
        semNo: Yup.string().required('Seminar is required'),
        companyNo: Yup.string().required('Company is required'),
        participantContactNo: Yup.string().required('Participant is required'),
        confirmed: Yup.boolean()
    });

    const onSubmit = async (values: typeof initialValues) => {
        const submitValues = {
            ...values,
            // since we have hidden fields, we need to ensure that the values are set
            companyNo: user?.customer_No || '',
            participantContactNo: user?.contact_No || ''
        };
        try {
            if (isEditMode) {
                if (!registration?.headerNo || !registration?.lineNo) {
                    toast.info('For whatever reason, we could not find the registration details. Please try again. You can log out and log in again to try again.');
                    return;
                }
                // Update existing registration
                await seminarService.updateSeminarRegistration(registration!.headerNo, registration!.lineNo, submitValues.confirmed);
                toast('Registration updated successfully', {type: 'success'});
                navigate('/dashboard');
                return;
            } else {
                await seminarService.createSeminarRegistration(submitValues);
                // TODO: Update SemRegistrations global store
                toast('Registration successful', {type: 'success'});
            }
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Error submitting form:', error);
            toast.error(error.message || `Error ${isEditMode ? 'updating' : 'creating'} registration`);
        }
    };

    if (!selectedSeminarNo) {
        return (
            <>
                <div className="flex-1 w-full mx-auto p-4 bg-white rounded-lg shadow-md">
                    <PageHeading loading={authLoading || semLoading || custLoading} heading={"Select a Seminar"}
                                 onClick={() => refresh()}/>
                    <div className="mb-4">
                        <label htmlFor="seminarSelect" className="block text-sm font-medium text-gray-700">
                            Please select a seminar to register for:
                        </label>
                        <select
                            id="seminarSelect"
                            name="seminarSelect"
                            className="mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e) => setSelectedSeminarNo(e.target.value)}
                        >
                            <option value="">Select a seminar</option>
                            {seminarHeaders.map(header => (
                                <option key={header.no} value={header.no}>
                                    {header.seminar_Name} - {header.starting_Date}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </>
        );
    }

    const seminarDetails = selectedSeminarHeader ? [
        {property: "Name", value: selectedSeminarHeader.seminar_Name},
        {property: "Starting date", value: formatDate(selectedSeminarHeader.starting_Date || "")},
        {property: "Duration", value: `${selectedSeminarHeader.duration} days`}
    ] : [];

    return (
        <div className="flex-1 w-full mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Register for Seminar</h1>
            {
                isEditMode &&
                (
                    <div className="mb-4 p-4 bg-blue-100 rounded-lg">
                        <p className="text-base font-normal mb-4">
                            You are currently in edit mode.
                            This basically means that you have registered for this seminar before.
                            You can edit the confirmation field below.
                        </p>
                        {!registration && (
                            <div className="flex justify-end space-x-4">
                                <Button variant="text"
                                        onClick={() => setSearchParams({edit: 'false'}, {replace: true})}>
                                    Switch to "New registration" mode
                                </Button>
                            </div>
                        )}
                    </div>
                )
            }
            {selectedSeminarHeader && (
                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Seminar Details</h2>
                    <PropertyTable data={seminarDetails}/>
                    <a href={`/dashboard/seminars/${selectedSeminarHeader.no}`} target="_blank"
                       rel="noopener noreferrer"
                       className="text-blue-500 underline">
                        View more details
                    </a>
                </div>
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={
                    async (values, {setSubmitting}) => {
                        await onSubmit(values);
                        setSubmitting(false);
                    }
                }
            >
                {({handleSubmit, isSubmitting, handleChange, handleBlur, values, errors}) => (
                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}>
                        <InputField
                            readOnly
                            invisible
                            id="companyNo"
                            name="companyNo"
                            label="Company"
                            type="text"
                            value={values.companyNo}
                            required
                        />
                        <InputField
                            readOnly
                            invisible
                            id="participantContactNo"
                            name="participantContactNo"
                            label="Participant"
                            type="text"
                            value={values.participantContactNo}
                            required
                        />
                        <InputField
                            id="confirmed"
                            name="confirmed"
                            label="Do you wish to confirm your registration now? You can always change this later."
                            type="checkbox"
                            checked={values.confirmed}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.confirmed}
                        />
                        <div className="flex justify-end space-x-4">
                            <Button type="submit" variant="primary" disabled={isSubmitting}>
                                Proceed to&nbsp;
                                {isEditMode ? 'update registration' : 'register'}
                                &nbsp;
                                {values.confirmed ? 'and confirm attendance' : '- you will confirm later'}
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default SeminarRegistrationForm;