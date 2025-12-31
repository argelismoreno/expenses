import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { EmployeeLayout } from '../../../components/layout/Layouts';
import { ExpenseStats } from '../components/ExpenseStats';
import { ExpenseList } from '../components/ExpenseList';
import { useExpenses } from '../hooks/useExpenses';

export const EmployeeDashboardPage = () => {
    const { expenses, isLoading, getMyExpenses, stats } = useExpenses();

    useEffect(() => {
        getMyExpenses();
    }, [getMyExpenses]);

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

            <ExpenseStats stats={stats} />
            <ExpenseList expenses={expenses} isLoading={isLoading} />
        </EmployeeLayout>
    );
};
