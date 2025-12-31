import { Injectable } from '@nestjs/common';
import { IExpenseValidationStrategy, ValidationResult } from './expense-validation.interface';
import { Expense } from '../entities/expense.entity';

@Injectable()
export class TravelValidationStrategy implements IExpenseValidationStrategy {
    async validate(expense: Expense, userId: string): Promise<ValidationResult> {
        const errors: string[] = [];

        // Viáticos: Pre-aprobación requerida
        // En este caso, simplemente verificamos que tenga justificación
        if (!expense.justification || expense.justification.trim().length === 0) {
            errors.push('Travel expenses require pre-approval justification');
        }

        if (expense.justification && expense.justification.length < 10) {
            errors.push('Travel justification must be at least 10 characters long');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }
}
