import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GlobalConfigService, IGlobalConfig } from './global-config.interface';

@Injectable()
export class GlobalConfigServiceImpl implements GlobalConfigService {
    private readonly config: IGlobalConfig;

    constructor(private configService: ConfigService) {
        this.config = {
            expenseLimits: {
                foodDailyLimit: 60, // $60 per day for food
                maxTrainingsPerMonth: 2, // Max 2 trainings per month
            },
            jwt: {
                secret: this.configService.get<string>('JWT_SECRET') || 'default-secret',
                expiresIn: this.configService.get<string>('JWT_EXPIRATION') || '24h',
            },
        };
    }

    getConfig(): IGlobalConfig {
        return this.config;
    }

    getFoodDailyLimit(): number {
        return this.config.expenseLimits.foodDailyLimit;
    }

    getMaxTrainingsPerMonth(): number {
        return this.config.expenseLimits.maxTrainingsPerMonth;
    }
}
