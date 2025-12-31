import React from 'react';
import { StatCard } from '../../../components/ui/StatCard';
import { Clock, CalendarDays, CheckCircle } from 'lucide-react';

interface ExpenseStatsProps {
    stats: {
        pending: number;
        total: number;
        reimbursed: number;
    };
}

export const ExpenseStats: React.FC<ExpenseStatsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard
                title="Total Pending"
                value={`$${stats.pending.toFixed(2)}`}
                icon={Clock}
                iconColorClass="text-yellow-600 dark:text-yellow-400"
                iconBgClass="bg-yellow-50 dark:bg-yellow-900/20"
            />
            <StatCard
                title="Total Expenses"
                value={`$${stats.total.toFixed(2)}`}
                icon={CalendarDays}
                iconColorClass="text-blue-600 dark:text-blue-400"
                iconBgClass="bg-blue-50 dark:bg-blue-900/20"
            />
            <StatCard
                title="Reimbursed"
                value={`$${stats.reimbursed.toFixed(2)}`}
                icon={CheckCircle}
                iconColorClass="text-green-600 dark:text-green-400"
                iconBgClass="bg-green-50 dark:bg-green-900/20"
            />
        </div>
    );
};
