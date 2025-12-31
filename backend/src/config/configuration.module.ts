import { Module } from '@nestjs/common';
import { GlobalConfigService } from './global-config.interface';
import { GlobalConfigServiceImpl } from './global-config.service';

@Module({
    providers: [
        {
            provide: GlobalConfigService,
            useClass: GlobalConfigServiceImpl, // Custom Provider using useClass
        },
    ],
    exports: [GlobalConfigService],
})
export class ConfigurationModule { }
