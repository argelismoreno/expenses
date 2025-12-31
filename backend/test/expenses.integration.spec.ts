import { Test, TestingModule } from '@nestjs/testing';
import { Expense } from '../src/expenses/entities/expense.entity';
import { ExpensesService } from '../src/expenses/expenses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExpenseStatus } from '../src/common/enums/expense-status.enum';
import { ExpenseType } from '../src/common/enums/expense-type.enum';
import { CreateExpenseDto } from '../src/expenses/dto/create-expense.dto';
import { ExpenseValidationContext } from '../src/expenses/strategies/expense-validation.context';

// Mock Repository
const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((expense) => Promise.resolve({ id: '1', ...expense })),
};

// Mock Strategy Context
const mockValidationStrategy = {
    validate: jest.fn().mockResolvedValue({ isValid: true, errors: [] }),
};

const mockValidationContext = {
    getStrategy: jest.fn().mockReturnValue(mockValidationStrategy),
};

describe('Expenses Integration', () => {
    let service: ExpensesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExpensesService,
                {
                    provide: getRepositoryToken(Expense),
                    useValue: mockRepository,
                },
                {
                    provide: ExpenseValidationContext,
                    useValue: mockValidationContext,
                },
            ],
        }).compile();

        service = module.get<ExpensesService>(ExpensesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create an expense successfully', async () => {
        const createDto: CreateExpenseDto = {
            amount: 100,
            description: 'Test expense',
            date: '2025-01-01',
            type: ExpenseType.TRAVEL,
            justification: 'Valid justification',
        };

        const result = await service.create(createDto, 'user-1');

        expect(result).toBeDefined();
        expect(result.status).toBe(ExpenseStatus.PENDING);
        expect(result.amount).toBe(100);
        expect(mockRepository.create).toHaveBeenCalled();
        expect(mockValidationContext.getStrategy).toHaveBeenCalledWith(ExpenseType.TRAVEL);
        expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw error if validation fails', async () => {
        mockValidationStrategy.validate.mockResolvedValueOnce({
            isValid: false,
            errors: ['Validation failed'],
        });

        const createDto: CreateExpenseDto = {
            amount: 100,
            description: 'Test expense',
            date: '2025-01-01',
            type: ExpenseType.TRAVEL,
        };

        await expect(service.create(createDto, 'user-1')).rejects.toThrow();
    });
});
