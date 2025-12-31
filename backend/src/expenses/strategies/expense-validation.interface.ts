import { Expense } from '../entities/expense.entity';

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

// Strategy Pattern: Interface for expense validation
export interface IExpenseValidationStrategy {
    validate(expense: Expense, userId: string): Promise<ValidationResult>;
}
