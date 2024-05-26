import { Module } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { FinancesController } from './finances.controller';
import { fincancesProviders } from './finances.providers';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from '../users/users.providers';
import { FinancesUtils } from './finances.utils';
import { OwnerUserGuard } from '../users/owner.guard';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [FinancesController],
  providers: [
    ...fincancesProviders,
    ...usersProviders,
    FinancesService,
    FinancesUtils,
    OwnerUserGuard,
  ],
})
export class FinancesModule {}
