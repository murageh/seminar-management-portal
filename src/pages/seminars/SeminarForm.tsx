import {useNavigate, useParams} from "react-router-dom";
import React from "react";
import {Seminar} from "../../dtos/Seminar.ts";
import * as seminarService from "../../services/seminarService.ts";
import {InputField} from "../../components/base/Inputs.tsx";
import Button from "../../components/base/Button.tsx";
import {Formik} from "formik";
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from "../../state/hooks.ts";
import {setGenPostingGroups, setVatPostingGroups} from "../../state/features/seminarSlice.ts";
import PropertyTable from "../../components/base/PropertyTable.tsx";

interface SeminarFormProps {
    seminar?: Seminar;
    mode?: "view" | "edit" | "create";
}

const SeminarForm: React.FC<SeminarFormProps> = ({mode = "edit"}) => {
    const navigate = useNavigate();
    const {no} = useParams<{ no: string }>();
    const {seminars, genPostingGroups, vatPostingGroups} = useAppSelector(state => state.seminar);
    const dispatch = useAppDispatch();
    let seminar = seminars.find(s => s.no === no);

    React.useEffect(() => {
        if (!seminar && !no) {
            navigate('/dashboard/seminars');
            return;
        }

        if (!seminar && no) {
            seminarService.getSeminar(no)
                .then((response) => {
                    seminar = response.data;
                });
            seminarService.getGenProdPostingGroups()
                .then((response) => {
                    dispatch(setGenPostingGroups(response.data));
                });
            seminarService.getVATProdPostingGroups()
                .then((response) => {
                    dispatch(setVatPostingGroups(response.data));
                });
        }
    }, [mode]);

    const initialValues: Seminar = {
        no: seminar?.no || '',
        name: seminar?.name || '',
        seminarPrice: seminar?.seminarPrice || 0,
        seminarDuration: seminar?.seminarDuration || 0,
        gen_Prod_Posting_Group: seminar?.gen_Prod_Posting_Group || '',
        vaT_Prod_Posting_Group: seminar?.vaT_Prod_Posting_Group || '',
        blocked: seminar?.blocked || false
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        seminarPrice: Yup.number().required('Price is required'),
        seminarDuration: Yup.number().required('Duration is required'),
        gen_Prod_Posting_Group: Yup.string().required('General Product Posting Group is required'),
        vaT_Prod_Posting_Group: Yup.string().required('VAT Product Posting Group is required')
    });

    const onSubmit = async (values: Seminar) => {
        try {
            if (seminar) {
                await seminarService.updateSeminar(no!, values);
            } else {
                await seminarService.createSeminar(values);
            }
            navigate('/dashboard/seminars');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    if (mode === "view") {
        const propertyData = [
            {property: "Seminar No", value: seminar?.no || ''},
            {property: "Name", value: seminar?.name || ''},
            {property: "Price", value: seminar?.seminarPrice.toString() || ''},
            {property: "Duration", value: seminar?.seminarDuration.toString() || ''},
            {property: "General Product Posting Group", value: seminar?.gen_Prod_Posting_Group || ''},
            {property: "VAT Product Posting Group", value: seminar?.vaT_Prod_Posting_Group || ''}
        ];

        return (
            <div className="flex-1 w-full mx-auto p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Seminar Information</h1>
                <PropertyTable data={propertyData}/>
                <div className="flex justify-end space-x-4 mt-4">
                    <Button type="button" variant="secondary" onClick={() => navigate('/dashboard/seminars')}>
                        Back
                    </Button>
                    <Button type="button" variant="primary"
                            onClick={() => navigate(`/dashboard/seminars/register/${seminar?.no}`)}>
                        Register for Seminar
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">{seminar ? 'Edit Seminar' : 'Create Seminar'}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({isSubmitting, handleChange, handleBlur, values, errors}) => (
                    <form className="space-y-4">
                        {seminar && (
                            <InputField
                                readOnly
                                id="no"
                                name="no"
                                label="Seminar No"
                                className="bg-gray-100 cursor-not-allowed"
                                value={values.no}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.no}
                            />
                        )}
                        <InputField
                            id="name"
                            name="name"
                            label="Name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.name}
                            required
                        />
                        <InputField
                            id="seminarPrice"
                            name="seminarPrice"
                            label="Price (KES)"
                            type="number"
                            value={values.seminarPrice}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.seminarPrice}
                            required
                        />
                        <InputField
                            id="seminarDuration"
                            name="seminarDuration"
                            label="Duration (days)"
                            type="number"
                            value={values.seminarDuration}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.seminarDuration}
                            required
                        />
                        <InputField
                            id="gen_Prod_Posting_Group"
                            name="gen_Prod_Posting_Group"
                            label="General Product Posting Group"
                            type="select"
                            value={values.gen_Prod_Posting_Group}
                            options={genPostingGroups.map(group => group.code)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.gen_Prod_Posting_Group}
                            required
                        />
                        <InputField
                            id="vaT_Prod_Posting_Group"
                            name="vaT_Prod_Posting_Group"
                            label="VAT Product Posting Group"
                            type="select"
                            value={values.vaT_Prod_Posting_Group}
                            options={vatPostingGroups.map(group => group.code)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.vaT_Prod_Posting_Group}
                            required
                        />
                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" disabled={isSubmitting}>
                                {seminar ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default SeminarForm;