import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto): Promise<{ user: User; token: string }> {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const user = this.userRepository.create({
            ...registerDto,
            password: hashedPassword,
            role: UserRole.EMPLOYEE, // Default role
        });

        await this.userRepository.save(user);

        const token = this.generateToken(user);

        return { user, token };
    }

    async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.generateToken(user);

        return { user, token };
    }

    async findById(id: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    private generateToken(user: User): string {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return this.jwtService.sign(payload);
    }

    // Seed method for creating default users
    async seedUsers(): Promise<void> {
        const adminExists = await this.userRepository.findOne({
            where: { email: 'admin@expenseflow.com' },
        });

        if (!adminExists) {
            const adminPassword = await bcrypt.hash('admin123', 10);
            const admin = this.userRepository.create({
                email: 'admin@expenseflow.com',
                password: adminPassword,
                firstName: 'Admin',
                lastName: 'User',
                role: UserRole.ADMIN,
            });
            await this.userRepository.save(admin);
            console.log('✅ Admin user created: admin@expenseflow.com / admin123');
        }

        const employeeExists = await this.userRepository.findOne({
            where: { email: 'employee@expenseflow.com' },
        });

        if (!employeeExists) {
            const employeePassword = await bcrypt.hash('employee123', 10);
            const employee = this.userRepository.create({
                email: 'employee@expenseflow.com',
                password: employeePassword,
                firstName: 'Employee',
                lastName: 'User',
                role: UserRole.EMPLOYEE,
            });
            await this.userRepository.save(employee);
            console.log('✅ Employee user created: employee@expenseflow.com / employee123');
        }
    }
}
