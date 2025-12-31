import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FoodValidationStrategy } from './food-validation.strategy';
import { Expense } from '../entities/expense.entity';
import { ExpenseType } from '../../common/enums/expense-type.enum';
import { GlobalConfigService } from '../../config/global-config.interface';

// Mock GlobalConfigService
const mockConfigService = {
    getFoodDailyLimit: jest.fn(() => 60),
};

// Mock Repository
const mockExpenseRepository = {
    find: jest.fn(),
};

describe('FoodValidationStrategy', () => {
    let strategy: FoodValidationStrategy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FoodValidationStrategy,
                {
                    provide: GlobalConfigService,
                    useValue: mockConfigService,
                },
                {
                    provide: getRepositoryToken(Expense),
                    useValue: mockExpenseRepository,
                },
            ],
        }).compile();

        strategy = module.get<FoodValidationStrategy>(FoodValidationStrategy);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(strategy).toBeDefined();
    });

    it('should validate correctly when expense is within limit', async () => {
        const expense = new Expense();
        expense.amount = 50;
        expense.date = new Date();
        expense.type = ExpenseType.FOOD;

        mockExpenseRepository.find.mockResolvedValue([]);

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should fail when single expense exceeds daily limit', async () => {
        const expense = new Expense();
        expense.amount = 61;
        expense.date = new Date();
        expense.type = ExpenseType.FOOD;

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Food expenses cannot exceed $60 per day');
    });

    it('should fail when cumulative expenses exceed daily limit', async () => {
        const expense = new Expense();
        expense.amount = 30;
        expense.date = new Date();
        expense.type = ExpenseType.FOOD;

        // Simulate existing expense of 40
        const existingExpense = new Expense();
        existingExpense.amount = 40;

        mockExpenseRepository.find.mockResolvedValue([existingExpense]);

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(false);
        expect(result.errors[0]).toMatch(/Total food expenses for this day.*would exceed the daily limit/);
    });
});
