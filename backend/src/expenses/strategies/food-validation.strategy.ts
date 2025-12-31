import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { IExpenseValidationStrategy, ValidationResult } from './expense-validation.interface';
import { Expense } from '../entities/expense.entity';
import { ExpenseType } from '../../common/enums/expense-type.enum';
import { GlobalConfigService } from '../../config/global-config.interface';

@Injectable()
export class FoodValidationStrategy implements IExpenseValidationStrategy {
    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,
        private readonly configService: GlobalConfigService,
    ) { }

    async validate(expense: Expense, userId: string): Promise<ValidationResult> {
        const errors: string[] = [];
        const dailyLimit = this.configService.getFoodDailyLimit();

        // Comida: Límite de $60 por día
        if (expense.amount > dailyLimit) {
            errors.push(`Food expenses cannot exceed $${dailyLimit} per day`);
        }

        // Verificar gastos de comida del mismo día
        const startOfDay = new Date(expense.date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(expense.date);
        endOfDay.setHours(23, 59, 59, 999);

        const existingFoodExpenses = await this.expenseRepository.find({
            where: {
                user: { id: userId },
                type: ExpenseType.FOOD,
                date: Between(startOfDay, endOfDay),
            },
        });

        const totalForDay = existingFoodExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
        const newTotal = totalForDay + Number(expense.amount);

        if (newTotal > dailyLimit) {
            errors.push(
                `Total food expenses for this day ($${newTotal.toFixed(2)}) would exceed the daily limit of $${dailyLimit}`,
            );
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }
}
