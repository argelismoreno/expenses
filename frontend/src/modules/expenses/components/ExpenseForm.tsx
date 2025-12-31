import React, { useState } from 'react';
import { BaseInput } from '../../../components/base/BaseInput';
import { BaseButton } from '../../../components/base/BaseButton';
import { CardLayout } from '../../../components/base/CardLayout';
import { type CreateExpenseDto, ExpenseType } from '../types/expense.types';
import { Calendar, DollarSign, FileText, Tag, AlignLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExpenseFormProps {
    onSubmit: (data: CreateExpenseDto) => Promise<boolean>;
    isLoading: boolean;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, isLoading }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: '',
        date: new Date().toISOString().split('T')[0],
        type: ExpenseType.FOOD,
        description: '',
        justification: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await onSubmit({
            amount: parseFloat(formData.amount),
            date: new Date(formData.date).toISOString(),
            type: formData.type,
            description: formData.description,
            justification: formData.justification || undefined,
        });

        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <CardLayout title="Expense Details" subtitle="Please fill in the details below.">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BaseInput
                        label="Amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        leftIcon={<DollarSign size={18} />}
                    />
                    <BaseInput
                        label="Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        leftIcon={<Calendar size={18} />}
                    />

                    <div className="w-full">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Type
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                <Tag size={18} />
                            </div>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-black pl-10 pr-3 py-2.5 shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm"
                            >
                                <option value={ExpenseType.FOOD}>Food (Comida)</option>
                                <option value={ExpenseType.TRAVEL}>Travel (Viáticos)</option>
                                <option value={ExpenseType.EQUIPMENT}>Equipment (Equipo)</option>
                                <option value={ExpenseType.TRAINING}>Training (Capacitación)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Description
                    </label>
                    <div className="relative group">
                        <div className="absolute top-3 left-3 text-slate-400 group-focus-within:text-primary transition-colors">
                            <FileText size={18} />
                        </div>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            required
                            className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-black pl-10 pr-3 py-2.5 shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm resize-none"
                            placeholder="Brief description of the expense..."
                        />
                    </div>
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Justification (Optional)
                    </label>
                    <div className="relative group">
                        <div className="absolute top-3 left-3 text-slate-400 group-focus-within:text-primary transition-colors">
                            <AlignLeft size={18} />
                        </div>
                        <textarea
                            name="justification"
                            value={formData.justification}
                            onChange={handleChange}
                            rows={2}
                            className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-black pl-10 pr-3 py-2.5 shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm resize-none"
                            placeholder="Additional context if needed..."
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <BaseButton
                        type="button"
                        variant="ghost"
                        onClick={() => navigate('/dashboard')}
                    >
                        Cancel
                    </BaseButton>
                    <BaseButton
                        type="submit"
                        isLoading={isLoading}
                    >
                        Save Expense
                    </BaseButton>
                </div>
            </form>
        </CardLayout>
    );
};
