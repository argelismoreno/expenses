import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'ExpenseFlow API is running! 🚀';
    }
}
