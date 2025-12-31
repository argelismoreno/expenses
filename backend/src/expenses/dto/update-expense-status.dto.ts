import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExpenseStatus } from '../../common/enums/expense-status.enum';

export class UpdateExpenseStatusDto {
    @ApiProperty({ enum: ExpenseStatus, example: 'approved', description: 'New status' })
    @IsEnum(ExpenseStatus)
    status: ExpenseStatus;

    @ApiPropertyOptional({ example: 'Monto excede presupuesto', description: 'Rejection reason' })
    @IsString()
    @IsOptional()
    rejectionReason?: string;
}
