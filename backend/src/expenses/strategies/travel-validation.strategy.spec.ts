import { Test, TestingModule } from '@nestjs/testing';
import { TravelValidationStrategy } from './travel-validation.strategy';
import { Expense } from '../entities/expense.entity';
import { ExpenseType } from '../../common/enums/expense-type.enum';

describe('TravelValidationStrategy', () => {
    let strategy: TravelValidationStrategy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TravelValidationStrategy],
        }).compile();

        strategy = module.get<TravelValidationStrategy>(TravelValidationStrategy);
    });

    it('should be defined', () => {
        expect(strategy).toBeDefined();
    });

    it('should validate correctly when justification is provided and long enough', async () => {
        const expense = new Expense();
        expense.type = ExpenseType.TRAVEL;
        expense.justification = 'Valid justification for travel expense';
        expense.amount = 100;

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should fail when justification is missing', async () => {
        const expense = new Expense();
        expense.type = ExpenseType.TRAVEL;
        expense.amount = 100;

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Travel expenses require pre-approval justification');
    });

    it('should fail when justification is empty string', async () => {
        const expense = new Expense();
        expense.type = ExpenseType.TRAVEL;
        expense.justification = '   ';
        expense.amount = 100;

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Travel expenses require pre-approval justification');
    });

    it('should fail when justification is too short', async () => {
        const expense = new Expense();
        expense.type = ExpenseType.TRAVEL;
        expense.justification = 'Short';
        expense.amount = 100;

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Travel justification must be at least 10 characters long');
    });
});
