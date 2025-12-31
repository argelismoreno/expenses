import { useState, useCallback } from 'react';
import { http } from '../../../adapters/http/AxiosAdapter';
import type { CreateExpenseDto, Expense, ExpenseResponse } from '../types/expense.types';

export const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [stats] = useState({
        pending: 0,
        total: 0,
        reimbursed: 0
    });

    const getMyExpenses = useCallback(async (page = 1, limit = 10) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await http.get<ExpenseResponse>(`/expenses/my-expenses?page=${page}&limit=${limit}`);
            console.log('useExpenses response:', response); // Debugging

            // Defensive check: ensure response.data is an array
            if (response && Array.isArray(response.data)) {
                setExpenses(response.data);
            } else {
                console.error('Unexpected response format:', response);
                setExpenses([]);
            }

            // Calculate simple stats from the fetched data (or fetch separate stats endpoint if available)
            // Ideally backend should provide stats endpoint. For now, we mock stats based on current page or accumulation.
            // But let's assume valid calculations or separate endpoint later.
        } catch (err: any) {
            setError(err.message || 'Failed to fetch expenses');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createExpense = async (data: CreateExpenseDto) => {
        setIsLoading(true);
        setError(null);
        try {
            await http.post('/expenses', data);
            // Refresh list or return success
            return true;
        } catch (err: any) {
            setError(err.message || 'Failed to create expense');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        expenses,
        isLoading,
        error,
        stats,
        getMyExpenses,
        createExpense
    };
};
