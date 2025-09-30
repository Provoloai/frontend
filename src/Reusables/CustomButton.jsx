import React from 'react';

const CustomButton = ({
    onClick,
    isLoading,
    children,
    className = '', ...props
}) => {
    return (
        <button
            onClick={onClick}
            className={`w-full py-3 px-6 text-white  rounded-lg flex items-center justify-center space-x-2 transition duration-150 ease-in-out ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                </>
            ) : (
                <span>{children}</span>
            )}
        </button>
    );
};

export default CustomButton;
