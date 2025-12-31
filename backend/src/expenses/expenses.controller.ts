import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Query,
    UseGuards,
    ParseIntPipe,
    DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseStatusDto } from './dto/update-expense-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Expenses')
@ApiBearerAuth('JWT-auth')
@Controller('expenses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) { }

    @Post()
    @Roles(UserRole.EMPLOYEE, UserRole.ADMIN)
    @ApiOperation({ summary: 'Create a new expense' })
    @ApiResponse({ status: 201, description: 'Expense created successfully' })
    async create(
        @Body() createExpenseDto: CreateExpenseDto,
        @CurrentUser() user: any,
    ) {
        const expense = await this.expensesService.create(createExpenseDto, user.userId);
        return {
            message: 'Expense created successfully',
            data: expense,
        };
    }

    @Get()
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get all expenses (Admin only)' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        return this.expensesService.findAll(page, limit);
    }

    @Get('my-expenses')
    @Roles(UserRole.EMPLOYEE, UserRole.ADMIN)
    @ApiOperation({ summary: 'Get my expenses' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async findMyExpenses(
        @CurrentUser() user: any,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        return this.expensesService.findByUser(user.userId, page, limit);
    }

    @Get('pending')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get pending expenses (Admin only)' })
    async findPending() {
        const expenses = await this.expensesService.findPending();
        return {
            data: expenses,
            total: expenses.length,
        };
    }

    @Get('total/:year/:month')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get total expenses by month (Admin only)' })
    @ApiParam({ name: 'year', type: Number, example: 2025 })
    @ApiParam({ name: 'month', type: Number, example: 1 })
    async getTotalByMonth(
        @Param('year', ParseIntPipe) year: number,
        @Param('month', ParseIntPipe) month: number,
    ) {
        return this.expensesService.getTotalByMonth(year, month);
    }

    @Get(':id')
    @Roles(UserRole.EMPLOYEE, UserRole.ADMIN)
    @ApiOperation({ summary: 'Get expense by ID' })
    @ApiParam({ name: 'id', type: String })
    async findOne(@Param('id') id: string) {
        const expense = await this.expensesService.findOne(id);
        return {
            data: expense,
        };
    }

    @Patch(':id/status')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update expense status (Admin only)' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Status updated successfully' })
    async updateStatus(
        @Param('id') id: string,
        @Body() updateStatusDto: UpdateExpenseStatusDto,
        @CurrentUser() user: any,
    ) {
        const expense = await this.expensesService.updateStatus(id, updateStatusDto, user.userId);
        return {
            message: 'Expense status updated successfully',
            data: expense,
        };
    }
}
