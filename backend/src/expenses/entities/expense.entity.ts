import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { ExpenseType } from '../../common/enums/expense-type.enum';
import { ExpenseStatus } from '../../common/enums/expense-status.enum';
import { User } from '../../auth/entities/user.entity';

@Entity('expenses')
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column('text')
    description: string;

    @Column('date')
    date: Date;

    @Column({
        type: 'enum',
        enum: ExpenseType,
    })
    type: ExpenseType;

    @Column({
        type: 'enum',
        enum: ExpenseStatus,
        default: ExpenseStatus.PENDING,
    })
    status: ExpenseStatus;

    @Column('text', { nullable: true })
    justification: string | null;

    @Column('text', { nullable: true })
    rejectionReason: string | null;

    @ManyToOne(() => User, (user) => user.expenses, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
