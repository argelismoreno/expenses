import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TrainingValidationStrategy } from './training-validation.strategy';
import { Expense } from '../entities/expense.entity';
import { ExpenseType } from '../../common/enums/expense-type.enum';
import { GlobalConfigService } from '../../config/global-config.interface';

// Mock GlobalConfigService
const mockConfigService = {
    getMaxTrainingsPerMonth: jest.fn(() => 2),
};

// Mock Repository
const mockExpenseRepository = {
    find: jest.fn(),
};

describe('TrainingValidationStrategy', () => {
    let strategy: TrainingValidationStrategy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TrainingValidationStrategy,
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

        strategy = module.get<TrainingValidationStrategy>(TrainingValidationStrategy);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(strategy).toBeDefined();
    });

    it('should validate correctly when limit is not reached', async () => {
        const expense = new Expense();
        expense.type = ExpenseType.TRAINING;
        expense.date = new Date();
        expense.justification = 'Valid training justification';

        mockExpenseRepository.find.mockResolvedValue([new Expense()]); // 1 existing training

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should fail when monthly limit is reached', async () => {
        const expense = new Expense();
        expense.type = ExpenseType.TRAINING;
        expense.date = new Date();
        expense.justification = 'Valid training justification';

        // 2 existing trainings
        mockExpenseRepository.find.mockResolvedValue([new Expense(), new Expense()]);

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(false);
        expect(result.errors[0]).toMatch(/Maximum of 2 training expenses per month already reached/);
    });

    it('should fail when justification is missing', async () => {
        const expense = new Expense();
        expense.type = ExpenseType.TRAINING;
        expense.date = new Date();

        mockExpenseRepository.find.mockResolvedValue([]);

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Training expenses require justification');
    });
});
