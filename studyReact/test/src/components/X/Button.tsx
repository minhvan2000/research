import React from 'react';
import clsx from 'clsx';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    ...rest
}) => {
    return (
        <button
            className={clsx(
                'sub-app-core-btn',
                'transition-colors',
                'focus:outline-none',
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
};
