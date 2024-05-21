import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { DatabaseModule } from '../database/database.module';
import { activitiesProviders } from './activities.providers';
import { usersProviders } from '../users/users.providers';
import { OwnerUserGuard } from '../users/owner.guard';
import { ActivitiesUtils } from './activities.utils';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [ActivitiesController],
  providers: [
    ...activitiesProviders,
    ...usersProviders,
    ActivitiesService,
    ActivitiesUtils,
    OwnerUserGuard,
  ],
})
export class ActivitiesModule {}
