import React from 'react';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    className = ''
}) => {
    const baseClasses = 'font-bold rounded transition-colors';

    const variants = {
        primary: 'bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-600 text-white disabled:bg-gray-600',
        success: 'bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white',
        danger: 'bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white',
        warning: 'bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-black'
    };

    const sizes = {
        sm: 'py-1 px-3 text-sm',
        md: 'py-2 px-4 text-base',
        lg: 'py-3 px-6 text-lg',
        xl: 'py-4 px-8 text-xl'
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;