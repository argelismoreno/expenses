import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseStatus } from '../common/enums/expense-status.enum';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseStatusDto } from './dto/update-expense-status.dto';
import { Expense } from './entities/expense.entity';
import { ExpenseValidationContext } from './strategies/expense-validation.context';

@Injectable()
export class ExpensesService {
    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,
        private readonly validationContext: ExpenseValidationContext,
    ) { }

    async create(createExpenseDto: CreateExpenseDto, userId: string): Promise<Expense> {
        // Create expense entity
        const expense = this.expenseRepository.create({
            ...createExpenseDto,
            user: { id: userId } as any,
            status: ExpenseStatus.PENDING,
        });

        // Get appropriate validation strategy
        const strategy = this.validationContext.getStrategy(createExpenseDto.type);

        // Validate using strategy pattern
        const validationResult = await strategy.validate(expense, userId);

        if (!validationResult.isValid) {
            throw new BadRequestException({
                message: 'Expense validation failed',
                errors: validationResult.errors,
            });
        }

        // Save expense
        return this.expenseRepository.save(expense);
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: Expense[]; total: number; page: number; totalPages: number }> {
        const [data, total] = await this.expenseRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findByUser(userId: string, page: number = 1, limit: number = 10): Promise<{ data: Expense[]; total: number; page: number; totalPages: number }> {
        const [data, total] = await this.expenseRepository.findAndCount({
            where: { user: { id: userId } },
            relations: ['user'], // Ensure user data is loaded
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findPending(): Promise<Expense[]> {
        return this.expenseRepository.find({
            where: { status: ExpenseStatus.PENDING },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Expense> {
        const expense = await this.expenseRepository.findOne({ where: { id } });

        if (!expense) {
            throw new NotFoundException(`Expense with ID ${id} not found`);
        }

        return expense;
    }

    async updateStatus(
        id: string,
        updateStatusDto: UpdateExpenseStatusDto,
        adminId: string,
    ): Promise<Expense> {
        const expense = await this.findOne(id);

        if (expense.status !== ExpenseStatus.PENDING) {
            throw new BadRequestException('Only pending expenses can be updated');
        }

        if (updateStatusDto.status === ExpenseStatus.REJECTED && !updateStatusDto.rejectionReason) {
            throw new BadRequestException('Rejection reason is required when rejecting an expense');
        }

        expense.status = updateStatusDto.status;
        expense.rejectionReason = updateStatusDto.rejectionReason || null;

        return this.expenseRepository.save(expense);
    }

    async getTotalByMonth(year: number, month: number): Promise<{ total: number; byType: Record<string, number> }> {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const expenses = await this.expenseRepository
            .createQueryBuilder('expense')
            .where('expense.date >= :startDate', { startDate })
            .andWhere('expense.date <= :endDate', { endDate })
            .andWhere('expense.status = :status', { status: ExpenseStatus.APPROVED })
            .getMany();

        const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

        const byType = expenses.reduce((acc, expense) => {
            const type = expense.type;
            acc[type] = (acc[type] || 0) + Number(expense.amount);
            return acc;
        }, {} as Record<string, number>);

        return { total, byType };
    }
}
