import { useState, useCallback } from 'react';
import { http } from '../../../adapters/http/AxiosAdapter';
import type { Expense, ExpenseStatus } from '../../expenses/types/expense.types';

export const useAdminExpenses = () => {
    const [pendingExpenses, setPendingExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getPendingExpenses = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await http.get<{ data: Expense[], total: number }>('/expenses/pending');
            // Defensive check: ensure response.data is an array
            if (response && Array.isArray(response.data)) {
                setPendingExpenses(response.data);
            } else {
                console.error('Unexpected response format in getPendingExpenses:', response);
                setPendingExpenses([]);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch pending expenses');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateExpenseStatus = async (id: string, status: ExpenseStatus, reason?: string) => {
        try {
            await http.patch(`/expenses/${id}/status`, { status, rejectionReason: reason });
            // Remove from pending list locally
            setPendingExpenses(prev => prev.filter(e => e.id !== id));
            return true;
        } catch (err: any) {
            setError(err.message || 'Failed to update status');
            return false;
        }
    };

    return {
        pendingExpenses,
        isLoading,
        error,
        getPendingExpenses,
        updateExpenseStatus
    };
};
