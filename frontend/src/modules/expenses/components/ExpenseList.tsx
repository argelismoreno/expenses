import React from 'react';
import { CardLayout } from '../../../components/base/CardLayout';
import { MoreVertical, DollarSign } from 'lucide-react';
import { type Expense, ExpenseStatus } from '../types/expense.types';

interface ExpenseListProps {
    expenses: Expense[];
    isLoading: boolean;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, isLoading }) => {
    return (
        <CardLayout title="Recent Expenses" noPadding>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4 text-right">Amount</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {isLoading && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    Loading expenses...
                                </td>
                            </tr>
                        )}
                        {!isLoading && expenses.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    No expenses found.
                                </td>
                            </tr>
                        )}
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                                    {new Date(expense.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-slate-900 dark:text-black truncate max-w-xs">
                                        {expense.description}
                                    </p>
                                    {expense.justification && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
                                            {expense.justification}
                                        </p>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
                                        {expense.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-slate-900 dark:text-black tabular-nums">
                                    ${Number(expense.amount).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border
                                        ${expense.status === ExpenseStatus.PENDING ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' : ''}
                                        ${expense.status === ExpenseStatus.APPROVED ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : ''}
                                        ${expense.status === ExpenseStatus.REJECTED ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' : ''}
                                    `}>
                                        {expense.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <MoreVertical size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardLayout>
    );
};
