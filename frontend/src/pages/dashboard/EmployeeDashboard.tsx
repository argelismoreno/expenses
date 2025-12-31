import {
    CalendarDays,
    CarTaxiFront,
    CheckCircle,
    Clock,
    Filter,
    MoreVertical,
    Plus,
    Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmployeeLayout } from '../../components/layout/Layouts';
import { StatCard } from '../../components/ui/StatCard';

export const EmployeeDashboard = () => {
    return (
        <EmployeeLayout>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-black tracking-tight">
                        My Expenses
                    </h2>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">
                        Manage and track your recent expense submissions.
                    </p>
                </div>
                <Link
                    to="/expenses/new"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-black font-medium py-2.5 px-5 rounded-lg shadow-sm hover:shadow transition-all active:scale-95"
                >
                    <Plus size={20} />
                    <span>Add New Expense</span>
                </Link>
            </div>

            {/* Summary Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard
                    title="Total Pending"
                    value="$345.00"
                    icon={Clock} // Pending icon not in lucide, using similar or custom logic for icons usually
                    iconColorClass="text-yellow-600 dark:text-yellow-400"
                    iconBgClass="bg-yellow-50 dark:bg-yellow-900/20"
                />
                <StatCard
                    title="This Month's Spend"
                    value="$1,240.50"
                    icon={CalendarDays}
                    iconColorClass="text-blue-600 dark:text-blue-400"
                    iconBgClass="bg-blue-50 dark:bg-blue-900/20"
                />
                <StatCard
                    title="Reimbursed"
                    value="$895.50"
                    icon={CheckCircle}
                    iconColorClass="text-green-600 dark:text-green-400"
                    iconBgClass="bg-green-50 dark:bg-green-900/20"
                />
            </div>

            {/* Filters & Search Bar */}
            <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
                <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search Input */}
                    <div className="relative w-full md:max-w-md group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            className="block w-full pl-10 pr-3 py-2.5 border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                            placeholder="Search by merchant, category, or ID..."
                            type="text"
                        />
                    </div>
                    {/* Chips / Filters */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-black text-sm font-medium whitespace-nowrap shadow-sm">
                            All Status
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium whitespace-nowrap transition-colors">
                            Pending
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium whitespace-nowrap transition-colors">
                            Approved
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium whitespace-nowrap transition-colors">
                            Rejected
                        </button>
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden md:block"></div>
                        <button className="flex items-center gap-1 text-slate-500 hover:text-primary text-sm font-medium whitespace-nowrap px-2">
                            <Filter size={20} />
                            <span>More Filters</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Merchant & Description</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {/* Row 1 */}
                            <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                                    Oct 24, 2023
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="size-10 flex-shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 text-slate-500">
                                            <CarTaxiFront size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-black">
                                                Uber Technologies
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Ride to JFK Airport
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                        Travel
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-slate-900 dark:text-black tabular-nums">
                                    $45.00
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800">
                                        <span className="size-1.5 rounded-full bg-yellow-500"></span>
                                        Pending
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <MoreVertical size={20} />
                                    </button>
                                </td>
                            </tr>
                            {/* Other rows omitted for brevity, logic allows mapping data */}
                        </tbody>
                    </table>
                </div>
            </div>
        </EmployeeLayout>
    );
};
