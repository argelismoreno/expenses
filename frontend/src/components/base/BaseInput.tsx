import React, { forwardRef } from 'react';
import clsx from 'clsx';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(({
    label,
    error,
    helperText,
    leftIcon,
    className,
    id,
    ...props
}, ref) => {
    const inputId = id || props.name;

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                    {label}
                </label>
            )}
            <div className="relative group">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        {leftIcon}
                    </div>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={clsx(
                        "block w-full rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-black shadow-sm transition-all focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
                        leftIcon ? "pl-10" : "pl-3",
                        "pr-3 py-2.5",
                        error
                            ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500/20"
                            : "border-slate-300 dark:border-slate-700 placeholder-slate-400 focus:border-primary focus:ring-primary/20 hover:border-slate-400 dark:hover:border-slate-600",
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {helperText}
                </p>
            )}
        </div>
    );
});

BaseInput.displayName = 'BaseInput';
