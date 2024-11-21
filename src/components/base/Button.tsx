import React from "react";
import classNames from "classnames";

type ButtonProps = {
    variant?: "primary" | "success" | "secondary" | "outlined" | "text";
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    alignment?: "left" | "center" | "right";
    innerAlignment?: "left" | "center" | "right";
    size?: "small" | "medium" | "large" | number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
                                           variant = "primary",
                                           fullWidth = false,
                                           icon,
                                           iconPosition = "left",
                                           alignment = "center",
                                           innerAlignment = "center",
                                           size = "medium",
                                           children,
                                           className,
                                           disabled,
                                           ...props
                                       }) => {
    const baseClasses = "font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all";
    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400",
        success: "bg-green-600 text-white hover:bg-green-500 focus:ring-green-400",
        secondary: "bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400",
        outlined: "border border-gray-600 text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
        text: "text-gray-700 hover:bg-blue-200 focus:ring-gray-800 underline",
    };
    const disabledClasses = "opacity-50 cursor-not-allowed";
    const widthClass = fullWidth ? "w-full" : "w-auto";
    const iconClass = iconPosition === "left" ? "mr-2" : "ml-2";
    const alignmentClass = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
    };
    const innerAlignmentClass = {
        left: "justify-left",
        center: "justify-center",
        right: "justify-right",
    };
    const sizeClasses = {
        small: "py-1 px-2 text-sm",
        medium: "py-2 px-4 text-base",
        large: "py-3 px-6 text-lg",
    };
    const customSizeClass = typeof size === "number" ? `py-${size} px-${size * 2} text-base` : sizeClasses[size];

    return (
        <div className={classNames("flex", alignmentClass[alignment])}>
            <button
                className={classNames(
                    baseClasses,
                    variantClasses[variant],
                    widthClass,
                    customSizeClass,
                    "flex items-center",
                    innerAlignmentClass[innerAlignment],
                    {[disabledClasses]: disabled},
                    className
                )}
                disabled={disabled}
                {...props}
            >
                {icon && iconPosition === "left" && <span className={iconClass}>{icon}</span>}
                {children}
                {icon && iconPosition === "right" && <span className={iconClass}>{icon}</span>}
            </button>
        </div>
    );
};

export default Button;