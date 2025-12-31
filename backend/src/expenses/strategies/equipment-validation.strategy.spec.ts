import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentValidationStrategy } from './equipment-validation.strategy';
import { Expense } from '../entities/expense.entity';
import { ExpenseType } from '../../common/enums/expense-type.enum';

describe('EquipmentValidationStrategy', () => {
    let strategy: EquipmentValidationStrategy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EquipmentValidationStrategy],
        }).compile();

        strategy = module.get<EquipmentValidationStrategy>(EquipmentValidationStrategy);
    });

    it('should be defined', () => {
        expect(strategy).toBeDefined();
    });

    it('should validate correctly with proper justification', async () => {
        const expense = new Expense();
        expense.type = ExpenseType.EQUIPMENT;
        expense.amount = 500;
        expense.justification = 'Valid equipment justification with enough length'; // > 20 chars

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should fail if justification is missing', async () => {
        const expense = new Expense();
        expense.type = ExpenseType.EQUIPMENT;
        expense.amount = 500;

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Equipment expenses require justification');
    });

    it('should fail if justification is too short for normal amount', async () => {
        const expense = new Expense();
        expense.type = ExpenseType.EQUIPMENT;
        expense.amount = 500;
        expense.justification = 'Short'; // < 20 chars

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Equipment justification must be at least 20 characters long');
    });

    it('should fail if justification is too short for high amount (>1000)', async () => {
        const expense = new Expense();
        expense.type = ExpenseType.EQUIPMENT;
        expense.amount = 1500;
        expense.justification = 'Valid equipment justification with enough length'; // 45 chars, but need 50

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Equipment expenses over $1000 require detailed justification (minimum 50 characters)');
    });

    it('should validate correctly for high amount with detailed justification', async () => {
        const expense = new Expense();
        expense.type = ExpenseType.EQUIPMENT;
        expense.amount = 1500;
        expense.justification = 'This is a very detailed justification for expensive equipment that is definitely over fifty characters long';

        const result = await strategy.validate(expense, 'user-1');
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });
});
