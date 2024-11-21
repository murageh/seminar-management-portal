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
    fullWidth?: boolean;
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
    fullWidth?: boolean;
}
type InputFieldProps = (NormalInputFieldProps | SelectInputFieldProps) & {
    invisible?: boolean;
};

export const InputField = ({id, label, required, fullWidth = true, ...props}: InputFieldProps) => (
    <div
        className={`${props.invisible ? 'hidden' : ''} flex flex-col align-baseline justify-center ${fullWidth ? '' : 'w-fit'}`}>
        {
            props.type === "checkbox" ?
                (
                    <label className="inline-flex items-center cursor-pointer gap-3">
                        <input type="checkbox" value="" className="sr-only peer" checked={props.checked} {...props}/>
                        <span
                            className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label} {required &&
                            <span className="text-red-500">*</span>}</span>
                        <div
                            className="relative w-11 h-6 bg-yellow-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                ) : (
                    <>
                        <label htmlFor={id} className="text-left block text-sm font-medium text-gray-700">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        {
                            props.type === "select" ? (
                                <select
                                    id={id}
                                    name={id}
                                    className={`mt-1 block ${fullWidth ? 'w-full' : ''} p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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
                                    className={`mt-1 block ${fullWidth ? 'w-full' : ''} p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                    required={required}
                                    {...props}
                                />
                            )
                        }
                        {
                            props.error && <p className="text-red-500 text-sm mt-1">{props.error}</p>
                        }
                    </>
                )
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