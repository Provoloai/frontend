import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";

interface TextInputFieldProps {
    id: string;
    name?: string;
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    touched?: boolean;
    type?: "text" | "password" | "email" | "number";
    iconStart?: React.ReactNode;
    required?: boolean;
    error?: string;
    disabled?: boolean;
    // React Hook Form compatibility
    ref?: React.Ref<HTMLInputElement>;
}

const TextInputField = React.forwardRef<HTMLInputElement, TextInputFieldProps>(({
    id,
    name,
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    touched,
    type = "text",
    iconStart,
    required = false,
    error,
    disabled = false,
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputValue = value ?? "";
    const isInvalid = (touched && required && !inputValue.trim()) || (error && error.length > 0);

    const isPassword = type === "password";
    const currentType = isPassword && showPassword ? "text" : type;

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div>
            <label
                htmlFor={id}
                className={`block text-sm mb-2 ${disabled ? "text-gray-400" : "text-gray-700"}`}
            >
                {label}
            </label>
            <div className="relative">
                {iconStart && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {iconStart}
                    </div>
                )}

                <input
                    ref={ref}
                    required={required}
                    type={currentType ?? "text"}
                    id={id}
                    name={name}
                    className={`w-full p-3 border rounded-md transition duration-150 ease-in-out placeholder:text-sm
            ${isInvalid
                            ? "ring-1 ring-red-600/10 ring-inset bg-red-50 placeholder-red-700 border-red-300"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        }
            ${iconStart ? "pl-10" : ""} 
            ${isPassword ? "pr-10" : ""}
            ${disabled
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed focus:ring-0 focus:border-gray-200"
                            : "bg-gray-50"
                        }`}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={`absolute inset-y-0 right-0 pr-3 flex items-center ${disabled ? "text-gray-300 cursor-not-allowed" : "text-gray-400"
                            }`}
                        tabIndex={-1}
                        disabled={disabled}
                    >
                        {showPassword ? <Eye /> : <EyeClosed />}
                    </button>
                )}
            </div>

            {error && error.length > 0 ? (
                <p className="text-xs text-red-700 mt-1">{error}</p>
            ) : (
                isInvalid && <p className="text-xs text-red-700 mt-1">Required</p>
            )}
        </div>
    );
});

TextInputField.displayName = "TextInputField";

export default TextInputField;
