import { useState, useEffect } from 'react';
import { AdminLayout } from '../../../components/layout/Layouts';
import { PendingApprovalsTable } from '../components/PendingApprovalsTable';
import { useAdminExpenses } from '../hooks/useAdminExpenses';
import { ExpenseStatus } from '../../expenses/types/expense.types';

export const AdminDashboardPage = () => {
    const { pendingExpenses, isLoading, getPendingExpenses, updateExpenseStatus } = useAdminExpenses();
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');

    useEffect(() => {
        getPendingExpenses();
    }, [getPendingExpenses]);

    const handleApprove = (id: string) => {
        updateExpenseStatus(id, ExpenseStatus.APPROVED);
    };

    const handleReject = (id: string) => {
        setSelectedExpenseId(id);
        setRejectModalOpen(true);
        setRejectionReason('');
    };

    const confirmReject = async () => {
        if (selectedExpenseId && rejectionReason.trim()) {
            const success = await updateExpenseStatus(selectedExpenseId, ExpenseStatus.REJECTED, rejectionReason);
            if (success) {
                setRejectModalOpen(false);
                setSelectedExpenseId(null);
                setRejectionReason('');
            }
        }
    };

    const cancelReject = () => {
        setRejectModalOpen(false);
        setSelectedExpenseId(null);
        setRejectionReason('');
    };

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

                <PendingApprovalsTable
                    expenses={pendingExpenses}
                    isLoading={isLoading}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            </div>

            {/* Rejection Reason Modal */}
            {rejectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Reject Expense Request
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                Please provide a reason for rejecting this expense. This will be sent to the employee.
                            </p>
                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                placeholder="Enter rejection reason..."
                                className="w-full h-32 p-3 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                                autoFocus
                            />
                            {rejectionReason.trim() === '' && (
                                <p className="mt-2 text-xs text-red-500">
                                    Reason is required.
                                </p>
                            )}
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-700">
                            <button
                                onClick={cancelReject}
                                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReject}
                                disabled={!rejectionReason.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Reject Expense
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};
