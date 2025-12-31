export type ExpenseStatus = 'pending' | 'approved' | 'rejected';

export const ExpenseStatus = {
    PENDING: 'pending' as ExpenseStatus,
    APPROVED: 'approved' as ExpenseStatus,
    REJECTED: 'rejected' as ExpenseStatus,
};

export const ExpenseType = {
    TRAVEL: 'travel',
    FOOD: 'food',
    EQUIPMENT: 'equipment',
    TRAINING: 'training',
} as const;

export type ExpenseType = typeof ExpenseType[keyof typeof ExpenseType];

export interface CreateExpenseDto {
    description: string;
    amount: number;
    date: string; // ISO string
    type: ExpenseType;
    justification?: string;
}

export interface Expense {
    id: string;
    description: string;
    amount: number;
    date: string;
    status: ExpenseStatus;
    type: ExpenseType;
    justification?: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface ExpenseResponse {
    data: Expense[];
    total: number;
    page: number;
    limit: number;
}
