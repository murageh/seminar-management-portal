import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {SeminarHeader} from "../../dtos/SeminarHeader.ts";
import * as seminarService from "../../services/seminarService.ts";
import * as customerService from "../../services/customerService.ts";
import {InputField} from "../../components/base/Inputs.tsx";
import Button from "../../components/base/Button.tsx";
import {Formik} from "formik";
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from "../../state/hooks.ts";
import {setSeminarHeaders, updateOrAddSeminarHeader} from "../../state/features/seminarHeaderSlice.ts";
import {Contact} from "../../dtos/AppResponse.ts";
import {setCustomers} from "../../state/features/customerSlice.ts";
import PropertyTable from "../../components/base/PropertyTable.tsx";
import {NewSeminarRegistrationRequest} from "../../dtos/AppRequest.ts";
import {toast} from "react-toastify";

interface SeminarRegistrationFormProps {
    seminar?: SeminarHeader;
    mode?: "view" | "edit" | "create";
}

const SeminarRegistrationForm: React.FC<SeminarRegistrationFormProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {no} = useParams<{ no: string }>();
    const dispatch = useAppDispatch();
    const {seminar: {seminarHeaders}, customer: {customers: companies}} = useAppSelector(state => state);
    const [selectedSeminarNo, setSelectedSeminarNo] = useState<string | null>(no || null);
    const [contactsInCompany, setContactsInCompany] = useState<Contact[]>([]);

    const selectedSeminarHeader = seminarHeaders.find(s => s.no === selectedSeminarNo);

    useEffect(() => {
        if (!selectedSeminarNo) {
            seminarService.getSeminarHeaders()
                .then(response => {
                    dispatch(setSeminarHeaders(response.data));
                })
                .catch(error => {
                    console.error('Error fetching seminarHeaders:', error);
                });

            if (companies.length === 0) {
                customerService.getCustomers()
                    .then(response => {
                        dispatch(setCustomers(response.customers));
                    })
                    .catch(error => {
                        console.error('Error fetching customers:', error);
                    });
            }
        } else {
            seminarService.getSeminarHeader(selectedSeminarNo)
                .then(response => {
                    const seminar = response.data;
                    dispatch(updateOrAddSeminarHeader(seminar));
                })
                .catch(error => {
                    console.error('Error fetching seminar headers:', error);
                });
        }
    }, [companies.length, dispatch, selectedSeminarNo]);

    const fetchContacts = (companyNo: string) => {
        const companyName = companies.find(company => company.no === companyNo)?.name;
        if (!companyName) {
            toast.warning('Company not found');
            return;
        }
        seminarService.getContactsByCompanyNo(companyName)
            .then(response => {
                console.log('Contacts:', response.data);
                setContactsInCompany(response.data);
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
                toast.error(error.message || `Could not fetch contact from company "${companyName}"`);
                setContactsInCompany([]);
            });
    }

    const initialValues: NewSeminarRegistrationRequest = {
        semNo: selectedSeminarNo || '',
        companyNo: '',
        participantContactNo: '',
        confirmed: false
    };

    const validationSchema = Yup.object({
        semNo: Yup.string().required('Seminar is required'),
        companyNo: Yup.string().required('Company is required'),
        participantContactNo: Yup.string().required('Participant is required'),
        confirmed: Yup.boolean()
    });

    const onSubmit = async (values: typeof initialValues) => {
        try {
            await seminarService.createSeminarRegistration(values);
            // TODO: Update SemRegistrations global store
            toast('Registration successful', {type: 'success'});
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Error submitting form:', error);
            toast.error(error.message || 'Error registering for seminar');
        }
    };

    const getCompanyName = (companyNo: string) => {
        const company = companies.find(company => company.no === companyNo);
        return company ? `${company.name} (${company.no})` : companyNo;
    };

    const getContactName = (contactNo: string) => {
        const contact = contactsInCompany.find(contact => contact.no === contactNo);
        return contact ? `${contact.name} (${contact.no})` : contactNo;
    };

    console.log({selectedSeminarNo, selectedSeminarHeader, companies, contactsInCompany});

    if (!selectedSeminarNo) {
        return (
            <div className="flex-1 w-full mx-auto p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Select a Seminar</h1>
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
        );
    }

    const seminarDetails = selectedSeminarHeader ? [
        {property: "Name", value: selectedSeminarHeader.seminar_Name},
        {property: "Starting date", value: selectedSeminarHeader.starting_Date},
        {property: "Duration", value: `${selectedSeminarHeader.duration} days`}
    ] : [];

    return (
        <div className="flex-1 w-full mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Register for Seminar</h1>
            {selectedSeminarHeader && (
                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Seminar Details</h2>
                    <PropertyTable data={seminarDetails}/>
                    <a href={`/dashboard/seminars/view/${selectedSeminarHeader.no}`} target="_blank"
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
                            id="companyNo"
                            name="companyNo"
                            label="Company"
                            type="select"
                            value={values.companyNo}
                            options={companies.map(company => ({
                                value: company.no,
                                label: getCompanyName(company.name)
                            }))}
                            onBlur={handleBlur}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                handleChange(e);
                                fetchContacts(e.target.value);
                            }}
                            error={errors.companyNo}
                            required
                        />
                        <InputField
                            id="participantContactNo"
                            name="participantContactNo"
                            label="Participant"
                            type="select"
                            value={values.participantContactNo}
                            options={contactsInCompany.map(contact => ({
                                value: contact.no,
                                label: getContactName(contact.no)
                            }))}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.participantContactNo}
                            required
                        />
                        <InputField
                            id="confirmed"
                            name="confirmed"
                            label="Confirmation"
                            type="checkbox"
                            checked={values.confirmed}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.confirmed}
                        />
                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" disabled={isSubmitting}>
                                Register
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default SeminarRegistrationForm;