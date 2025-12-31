import { Injectable } from '@nestjs/common';
import { IExpenseValidationStrategy, ValidationResult } from './expense-validation.interface';
import { Expense } from '../entities/expense.entity';

@Injectable()
export class EquipmentValidationStrategy implements IExpenseValidationStrategy {
    async validate(expense: Expense, userId: string): Promise<ValidationResult> {
        const errors: string[] = [];

        // Equipo: Requiere justificación y aprobación
        if (!expense.justification || expense.justification.trim().length === 0) {
            errors.push('Equipment expenses require justification');
        }

        if (expense.justification && expense.justification.length < 20) {
            errors.push('Equipment justification must be at least 20 characters long');
        }

        // Validación adicional para montos altos
        if (expense.amount > 1000) {
            if (!expense.justification || expense.justification.length < 50) {
                errors.push('Equipment expenses over $1000 require detailed justification (minimum 50 characters)');
            }
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }
}
