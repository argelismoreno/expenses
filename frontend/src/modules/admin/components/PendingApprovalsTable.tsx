import React from 'react';
import { Check, X } from 'lucide-react';
import { CardLayout } from '../../../components/base/CardLayout';
import type { Expense } from '../../expenses/types/expense.types';

interface PendingApprovalsTableProps {
    expenses: Expense[];
    isLoading: boolean;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}

export const PendingApprovalsTable: React.FC<PendingApprovalsTableProps> = ({
    expenses,
    isLoading,
    onApprove,
    onReject
}) => {
    return (
        <CardLayout title="Pending Approvals" noPadding className="flex-1">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Employee</th>
                            <th className="px-6 py-4 font-semibold">Date</th>
                            <th className="px-6 py-4 font-semibold">Type</th>
                            <th className="px-6 py-4 font-semibold w-1/3">Description</th>
                            <th className="px-6 py-4 font-semibold text-right">Amount</th>
                            <th className="px-6 py-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {isLoading && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    Loading request...
                                </td>
                            </tr>
                        )}
                        {!isLoading && expenses.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    No pending approvals.
                                </td>
                            </tr>
                        )}
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-medium">
                                            {expense.user?.firstName?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-black">
                                                {expense.user?.firstName} {expense.user?.lastName}
                                            </p>
                                            <p className="text-xs text-slate-500">{expense.user?.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                    {new Date(expense.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/30 uppercase">
                                        {expense.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300 truncate max-w-xs">
                                    {expense.description}
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-black">
                                    ${Number(expense.amount).toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onReject(expense.id)}
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-red-500 hover:bg-red-50 hover:border-red-200 dark:border-slate-600 dark:hover:bg-red-900/30 transition-colors"
                                            title="Reject"
                                        >
                                            <X size={18} />
                                        </button>
                                        <button
                                            onClick={() => onApprove(expense.id)}
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-black hover:bg-primary/90 shadow-sm shadow-primary/30 transition-colors"
                                            title="Approve"
                                        >
                                            <Check size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardLayout>
    );
};
