import React from 'react';
import clsx from 'clsx';

interface CardLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    className?: string;
    headerAction?: React.ReactNode;
    noPadding?: boolean;
}

export const CardLayout: React.FC<CardLayoutProps> = ({
    children,
    title,
    subtitle,
    className,
    headerAction,
    noPadding = false,
}) => {
    return (
        <div className={clsx("bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden", className)}>
            {(title || headerAction) && (
                <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between gap-4">
                    <div>
                        {title && (
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-black">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {headerAction && (
                        <div>
                            {headerAction}
                        </div>
                    )}
                </div>
            )}
            <div className={clsx(noPadding ? "" : "p-6")}>
                {children}
            </div>
        </div>
    );
};
