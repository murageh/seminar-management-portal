import React from "react";

export const InputField = ({id, label, required, ...props}: {
    id: string;
    label: string;
    required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className={"flex flex-col align-baseline justify-center"}>
        <label htmlFor={id} className="text-left block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            id={id}
            className="mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required={required}
            {...props}
        />
    </div>
);