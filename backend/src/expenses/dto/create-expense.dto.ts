import { IsNotEmpty, IsNumber, IsString, IsEnum, IsDateString, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExpenseType } from '../../common/enums/expense-type.enum';

export class CreateExpenseDto {
    @ApiProperty({ example: 45.50, description: 'Expense amount', minimum: 0.01 })
    @IsNumber()
    @Min(0.01)
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ example: 'Almuerzo con cliente', description: 'Expense description' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: '2025-01-15', description: 'Expense date (YYYY-MM-DD)' })
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({ enum: ExpenseType, example: 'food', description: 'Type of expense' })
    @IsEnum(ExpenseType)
    @IsNotEmpty()
    type: ExpenseType;

    @ApiPropertyOptional({ example: 'Reunión con cliente', description: 'Justification (required for some types)' })
    @IsString()
    @IsOptional()
    justification?: string;
}
