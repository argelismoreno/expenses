import React from 'react';
import { type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    iconColorClass?: string;
    iconBgClass?: string;
    subtext?: React.ReactNode;
    trend?: {
        value: number;
        label: string;
    };
    type?: 'default' | 'neutral' | 'positive' | 'negative' | 'warning';
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    iconColorClass,
    iconBgClass,
    subtext,
    trend,
    type = 'default',
}) => {
    const getColors = () => {
        if (iconColorClass && iconBgClass) return { color: iconColorClass, bg: iconBgClass };

        switch (type) {
            case 'positive': return { color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
            case 'negative': return { color: 'text-red-500', bg: 'bg-red-500/10' };
            case 'warning': return { color: 'text-orange-500', bg: 'bg-orange-500/10' };
            case 'neutral':
            default: return { color: 'text-primary', bg: 'bg-primary/10' };
        }
    };

    const { color, bg } = getColors();

    return (
        <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {title}
                </p>
                <div className={clsx('p-1.5 rounded-lg', bg, color)}>
                    <Icon size={24} />
                </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-black">
                {value}
            </h3>
            {(subtext || trend) && (
                <div className="text-xs text-slate-400 mt-2 flex items-center gap-2">
                    {trend ? (
                        <span className={clsx(
                            "font-medium",
                            trend.value > 0 ? "text-emerald-500" : trend.value < 0 ? "text-red-500" : "text-slate-500"
                        )}>
                            {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
                        </span>
                    ) : (
                        subtext
                    )}
                </div>
            )}
        </div>
    );
};
