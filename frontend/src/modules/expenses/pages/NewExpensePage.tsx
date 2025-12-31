import { useExpenses } from '../hooks/useExpenses';
import { ExpenseForm } from '../components/ExpenseForm';
import { EmployeeLayout } from '../../../components/layout/Layouts';

export const NewExpensePage = () => {
    const { createExpense, isLoading } = useExpenses();

    return (
        <EmployeeLayout>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-black tracking-tight">
                    New Expense
                </h2>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                    Submit a new expense for reimbursement.
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <ExpenseForm onSubmit={createExpense} isLoading={isLoading} />
            </div>
        </EmployeeLayout>
    );
};
