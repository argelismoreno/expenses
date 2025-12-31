import { Injectable } from '@nestjs/common';
import { IExpenseValidationStrategy } from './expense-validation.interface';
import { ExpenseType } from '../../common/enums/expense-type.enum';
import { TravelValidationStrategy } from './travel-validation.strategy';
import { FoodValidationStrategy } from './food-validation.strategy';
import { EquipmentValidationStrategy } from './equipment-validation.strategy';
import { TrainingValidationStrategy } from './training-validation.strategy';

@Injectable()
export class ExpenseValidationContext {
    private strategies: Map<ExpenseType, IExpenseValidationStrategy>;

    constructor(
        private readonly travelStrategy: TravelValidationStrategy,
        private readonly foodStrategy: FoodValidationStrategy,
        private readonly equipmentStrategy: EquipmentValidationStrategy,
        private readonly trainingStrategy: TrainingValidationStrategy,
    ) {
        this.strategies = new Map<ExpenseType, IExpenseValidationStrategy>([
            [ExpenseType.TRAVEL, this.travelStrategy],
            [ExpenseType.FOOD, this.foodStrategy],
            [ExpenseType.EQUIPMENT, this.equipmentStrategy],
            [ExpenseType.TRAINING, this.trainingStrategy],
        ]);
    }

    getStrategy(type: ExpenseType): IExpenseValidationStrategy {
        const strategy = this.strategies.get(type);
        if (!strategy) {
            throw new Error(`No validation strategy found for expense type: ${type}`);
        }
        return strategy;
    }
}
