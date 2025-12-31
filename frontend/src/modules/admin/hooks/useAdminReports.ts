import { useState, useCallback } from 'react';
import { http } from '../../../adapters/http/AxiosAdapter';

interface ReportStats {
    total: number;
    byType: Record<string, number>;
}

export const useAdminReports = () => {
    const [stats, setStats] = useState<ReportStats | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getStats = useCallback(async (year: number, month: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await http.get<ReportStats>(`/expenses/total/${year}/${month}`);
            setStats(response);
        } catch (err: any) {
            console.error('Failed to fetch report stats:', err);
            setError(err.message || 'Failed to fetch report statistics');
            setStats(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        stats,
        isLoading,
        error,
        getStats
    };
};
