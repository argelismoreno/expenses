import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { IExpenseValidationStrategy, ValidationResult } from './expense-validation.interface';
import { Expense } from '../entities/expense.entity';
import { ExpenseType } from '../../common/enums/expense-type.enum';
import { GlobalConfigService } from '../../config/global-config.interface';

@Injectable()
export class TrainingValidationStrategy implements IExpenseValidationStrategy {
    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,
        private readonly configService: GlobalConfigService,
    ) { }

    async validate(expense: Expense, userId: string): Promise<ValidationResult> {
        const errors: string[] = [];
        const maxTrainingsPerMonth = this.configService.getMaxTrainingsPerMonth();

        // Capacitación: Máximo 2 por mes
        const expenseDate = new Date(expense.date);
        const startOfMonth = new Date(expenseDate.getFullYear(), expenseDate.getMonth(), 1);
        const endOfMonth = new Date(expenseDate.getFullYear(), expenseDate.getMonth() + 1, 0, 23, 59, 59, 999);

        const existingTrainings = await this.expenseRepository.find({
            where: {
                user: { id: userId },
                type: ExpenseType.TRAINING,
                date: Between(startOfMonth, endOfMonth),
            },
        });

        if (existingTrainings.length >= maxTrainingsPerMonth) {
            errors.push(
                `Maximum of ${maxTrainingsPerMonth} training expenses per month already reached for ${expenseDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`,
            );
        }

        // Requiere justificación
        if (!expense.justification || expense.justification.trim().length === 0) {
            errors.push('Training expenses require justification');
        }

        if (expense.justification && expense.justification.length < 15) {
            errors.push('Training justification must be at least 15 characters long');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }
}
