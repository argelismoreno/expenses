import {
    Clock,
    Banknote,
    AlertTriangle,
    ChevronDown,
    Filter,
    Download,
    Check,
    X,
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/Layouts';
import { StatCard } from '../../components/ui/StatCard';

export const AdminDashboard = () => {
    return (
        <AdminLayout>
            <div className="p-6 md:p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
                {/* Page Heading */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-black">
                        Pending Approvals
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        Review and manage expense requests requiring your attention.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <StatCard
                        title="Total Pending"
                        value="12 Requests"
                        icon={Clock}
                        iconColorClass="text-primary"
                        iconBgClass="bg-primary/10"
                        subtext={
                            <span className="text-slate-400">
                                <span className="text-green-500 font-medium">+4 new</span> since
                                yesterday
                            </span>
                        }
                    />
                    <StatCard
                        title="Total Amount"
                        value="$4,250.00"
                        icon={Banknote}
                        iconColorClass="text-emerald-500"
                        iconBgClass="bg-emerald-500/10"
                        subtext="USD Currency"
                    />
                    <StatCard
                        title="Urgent Requests"
                        value="2 Overdue"
                        icon={AlertTriangle}
                        iconColorClass="text-orange-500"
                        iconBgClass="bg-orange-500/10"
                        subtext="Waiting > 7 days"
                    />
                </div>

                {/* Main Table Section */}
                <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-[#1a2632]">
                    {/* Filters Toolbar */}
                    <div className="flex flex-col gap-4 border-b border-slate-200 p-4 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap gap-2">
                            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                                Department
                                <ChevronDown size={18} />
                            </button>
                            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                                Date Range
                                <ChevronDown size={18} />
                            </button>
                            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                                Amount
                                <ChevronDown size={18} />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700">
                                <Filter size={20} />
                            </button>
                            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700">
                                <Download size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Employee</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Type</th>
                                    <th className="px-6 py-4 font-semibold w-1/3">Description</th>
                                    <th className="px-6 py-4 font-semibold text-right">Amount</th>
                                    <th className="px-6 py-4 font-semibold text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {/* Row 1 */}
                                <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden">
                                                <img
                                                    alt="Sarah Jenkins"
                                                    className="h-full w-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-JHJLipssjVLeyv8wYQGAqVSXqrLTzEQvt7FXlAHRMHw8awM4FH1UgwhLL7bYxDoFsiWzDffjAhKcQ5QNTDXtID1_aUxUhnX_JmzuDoJHwTwsf2w5XXdMkNYHJ8EdQxf2wwnwxTi-xQKHAQVCaZ4LD7AX5UqcaPJcmtUy9QDx3sLe54xK7aHouzKIr2AajG3Bew3IhYBNJJITxRv32sfRyCDATJWAWFGCsspEOO8foljbk3bLuUbJpps_ctqa02e7cqPuAgqP_g"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-black">
                                                    Sarah Jenkins
                                                </p>
                                                <p className="text-xs text-slate-500">Marketing</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                        Oct 24, 2023
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/30">
                                            Travel
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 truncate max-w-xs">
                                        Client dinner at Bistro Downtown with VP of Sales
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-black">
                                        $124.50
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-red-500 hover:bg-red-50 hover:border-red-200 dark:border-slate-600 dark:hover:bg-red-900/30 transition-colors"
                                                title="Reject"
                                            >
                                                <X size={18} />
                                            </button>
                                            <button
                                                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-black hover:bg-primary/90 shadow-sm shadow-primary/30 transition-colors"
                                                title="Approve"
                                            >
                                                <Check size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* More rows omitted */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
