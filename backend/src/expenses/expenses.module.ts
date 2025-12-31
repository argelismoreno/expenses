import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { Expense } from './entities/expense.entity';
import { ConfigurationModule } from '../config/configuration.module';

// Import all validation strategies
import { ExpenseValidationContext } from './strategies/expense-validation.context';
import { TravelValidationStrategy } from './strategies/travel-validation.strategy';
import { FoodValidationStrategy } from './strategies/food-validation.strategy';
import { EquipmentValidationStrategy } from './strategies/equipment-validation.strategy';
import { TrainingValidationStrategy } from './strategies/training-validation.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([Expense]),
        ConfigurationModule, // Import for GlobalConfigService
    ],
    controllers: [ExpensesController],
    providers: [
        ExpensesService,
        ExpenseValidationContext,
        TravelValidationStrategy,
        FoodValidationStrategy,
        EquipmentValidationStrategy,
        TrainingValidationStrategy,
    ],
    exports: [ExpensesService],
})
export class ExpensesModule { }
