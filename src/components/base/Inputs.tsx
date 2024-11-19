import React from "react";

type NormalInputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    required?: boolean;
    type?: Exclude<React.InputHTMLAttributes<HTMLInputElement>["type"], "select">;
    error?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    options?: never;
};
type SelectInputFieldProps = React.InputHTMLAttributes<HTMLSelectElement> & {
    id: string;
    type: "select";
    label: string;
    required?: boolean;
    error?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options?: Array<string | { label: string; value: string }>;
}
type InputFieldProps = NormalInputFieldProps | SelectInputFieldProps;

export const InputField = ({id, label, required, ...props}: InputFieldProps) => (
    <div className={"flex flex-col align-baseline justify-center"}>
        <label htmlFor={id} className="text-left block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {
            props.type === "select" ? (
                <select
                    id={id}
                    name={id}
                    className="mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required={required}
                    {...props}
                >
                    <option value="">Select an option</option>
                    {props.options?.map((option, index) => (
                        typeof option === 'string' ? (
                            <option key={index} value={option}>{option}</option>
                        ) : (
                            <option key={index} value={option.value}>{option.label}</option>
                        )
                    ))}
                </select>
            ) : (
                <input
                    id={id}
                    name={id}
                    className="mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required={required}
                    {...props}
                />
            )
        }
        {
            props.error && <p className="text-red-500 text-sm mt-1">{props.error}</p>
        }
    </div>
);

// Exports just the styled input field without the label or outer container
export const FormikInputField = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            className="mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required={props.required}
            {...props}
        />
    );
}