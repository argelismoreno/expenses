// Configuration interface
export interface IGlobalConfig {
    expenseLimits: {
        foodDailyLimit: number;
        maxTrainingsPerMonth: number;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
}

// Abstract class for configuration
export abstract class GlobalConfigService {
    abstract getConfig(): IGlobalConfig;
    abstract getFoodDailyLimit(): number;
    abstract getMaxTrainingsPerMonth(): number;
}
