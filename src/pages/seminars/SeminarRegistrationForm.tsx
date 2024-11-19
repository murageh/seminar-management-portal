import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Seminar} from "../../dtos/Seminar.ts";
import * as seminarService from "../../services/seminarService.ts";
import * as customerService from "../../services/customerService.ts";
import {InputField} from "../../components/base/Inputs.tsx";
import Button from "../../components/base/Button.tsx";
import {Formik} from "formik";
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from "../../state/hooks.ts";
import {setSeminars} from "../../state/features/seminarSlice.ts";
import {Contact} from "../../dtos/AppResponse.ts";
import {setCustomers} from "../../state/features/customerSlice.ts";
import PropertyTable from "../../components/base/PropertyTable.tsx";

interface SeminarRegistrationFormProps {
    seminar?: Seminar;
    mode?: "view" | "edit" | "create";
}

const SeminarRegistrationForm: React.FC<SeminarRegistrationFormProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {no} = useParams<{ no: string }>();
    const dispatch = useAppDispatch();
    const {seminar: {seminars}, customer: {customers: companies}} = useAppSelector(state => state);
    const [selectedSeminarNo, setSelectedSeminarNo] = useState<string | null>(no || location.state?.seminarNo || null);
    const [contactsInCompany, setContactsInCompany] = useState<Contact[]>([]);
    const [participants, setParticipants] = useState<string[]>([]);
    const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);

    useEffect(() => {
        if (!selectedSeminarNo) {
            seminarService.getSeminars()
                .then(response => {
                    dispatch(setSeminars(response.data));
                })
                .catch(error => {
                    console.error('Error fetching seminars:', error);
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
            seminarService.getSeminar(selectedSeminarNo)
                .then(response => {
                    const seminar = response.data;
                    setSelectedSeminar(seminar);
                    dispatch(setSeminars([seminar]));
                })
                .catch(error => {
                    console.error('Error fetching seminar:', error);
                });
        }
    }, [companies.length, dispatch, selectedSeminarNo]);

    const fetchContacts = (companyNo: string) => {
        seminarService.getContactsByCompanyNo(companyNo)
            .then(response => {
                setContactsInCompany(response.data);
                setParticipants(response.data.map(contact => contact.name));
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
    }

    const initialValues = {
        companyNumber: '',
        participantContactNumber: '',
        name: '',
        confirmation: false
    };

    const validationSchema = Yup.object({
        companyNumber: Yup.string().required('Company number is required'),
        participantContactNumber: Yup.string().required('Participant contact number is required'),
        name: Yup.string().required('Name is required'),
        confirmation: Yup.boolean()
    });

    const onSubmit = async (values: typeof initialValues) => {
        try {
            console.log(values);
            navigate('/dashboard/seminars');
        } catch (error) {
            console.error('Error submitting form:', error);
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
                        {seminars.map(seminar => (
                            <option key={seminar.no} value={seminar.no}>
                                {seminar.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }

    const seminarDetails = selectedSeminar ? [
        {property: "Name", value: selectedSeminar.name},
        {property: "Price", value: selectedSeminar.seminarPrice.toString()},
        {property: "Duration", value: `${selectedSeminar.seminarDuration} days`}
    ] : [];

    return (
        <div className="flex-1 w-full mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Register for Seminar</h1>
            {selectedSeminar && (
                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Seminar Details</h2>
                    <PropertyTable data={seminarDetails}/>
                    <a href={`/dashboard/seminars/view/${selectedSeminar.no}`} target="_blank" rel="noopener noreferrer"
                       className="text-blue-500 underline">
                        View more details
                    </a>
                </div>
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({isSubmitting, handleChange, handleBlur, values, errors}) => (
                    <form className="space-y-4">
                        <InputField
                            id="companyNumber"
                            name="companyNumber"
                            label="Company"
                            type="select"
                            value={values.companyNumber}
                            options={companies.map(company => ({
                                value: company.no,
                                label: getCompanyName(company.no)
                            }))}
                            onBlur={handleBlur}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                handleChange(e);
                                fetchContacts(e.target.value);
                            }}
                            error={errors.companyNumber}
                            required
                        />
                        <InputField
                            id="participantContactNumber"
                            name="participantContactNumber"
                            label="Participant"
                            type="select"
                            value={values.participantContactNumber}
                            options={contactsInCompany.map(contact => ({
                                value: contact.no,
                                label: getContactName(contact.no)
                            }))}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.participantContactNumber}
                            required
                        />
                        <InputField
                            id="name"
                            type="text"
                            name="name"
                            label="Name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.name}
                            required
                        />
                        <InputField
                            id="confirmation"
                            name="confirmation"
                            label="Confirmation"
                            type="checkbox"
                            checked={values.confirmation}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.confirmation}
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