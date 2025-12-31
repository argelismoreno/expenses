
import { useState, useEffect } from 'react';
import { AdminLayout } from '../../../components/layout/Layouts';
import { useAdminReports } from '../hooks/useAdminReports';
import { CardLayout } from '../../../components/base/CardLayout';
import { StatCard } from "../../../components/ui/StatCard";
import { DollarSign, PieChart, Wrench, Coffee, Plane, Briefcase } from "lucide-react";

export const AdminReportsPage = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const { stats, isLoading, error, getStats } = useAdminReports();

    useEffect(() => {
        getStats(selectedYear, selectedMonth);
    }, [getStats, selectedYear, selectedMonth]);

    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ];

    const getIconForType = (type: string) => {
        switch (type.toLowerCase()) {
            case 'travel': return Plane;
            case 'food': return Coffee;
            case 'equipment': return Wrench; // specific enough?
            case 'training': return Briefcase;
            default: return PieChart;
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 md:p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
                {/* Header & Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-black">
                            Financial Reports
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            Overview of approved expenses and spending breakdown.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-white dark:bg-[#1a2632] p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            className="bg-transparent border-none text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-0 cursor-pointer"
                        >
                            {months.map(m => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </select>
                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="bg-transparent border-none text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-0 cursor-pointer"
                        >
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500">Loading statistics...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Total Summary */}
                        <div className="lg:col-span-3">
                            <StatCard
                                title="Total Approved Expenses"
                                value={`$${Number(stats?.total || 0).toFixed(2)}`}
                                icon={DollarSign}
                                trend={{ value: 0, label: 'vs last month' }} // Placeholder trend
                                type="neutral"
                            />
                        </div>

                        {/* Breakdown Chart/List */}
                        <div className="lg:col-span-3">
                            <CardLayout title="Expenses by Category" className="h-full">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {Object.entries(stats?.byType || {}).map(([type, amount]) => {
                                        const Icon = getIconForType(type);
                                        return (
                                            <div key={type} className="flex items-center p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                                <div className="p-3 rounded-lg bg-white dark:bg-slate-700 shadow-sm mr-4">
                                                    <Icon className="text-primary" size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 capitalize">
                                                        {type}
                                                    </p>
                                                    <p className="text-lg font-bold text-slate-900 dark:text-black">
                                                        ${Number(amount).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {Object.keys(stats?.byType || {}).length === 0 && (
                                        <p className="col-span-full text-center text-slate-500 py-8">
                                            No approved expenses for this period.
                                        </p>
                                    )}
                                </div>
                            </CardLayout>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};
