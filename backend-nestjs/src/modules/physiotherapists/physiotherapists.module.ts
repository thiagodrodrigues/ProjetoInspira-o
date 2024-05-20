import { Module, forwardRef } from '@nestjs/common';
import { PhysiotherapistsService } from './physiotherapists.service';
import { PhysiotherapistsController } from './physiotherapists.controller';
import { DatabaseModule } from '../database/database.module';
import { physiotherapistsProviders } from './physiotherapists.providers';
import { PhysiotherapistsUtils } from './physiotherapists.utils';
import { PhysiotherapistsUserGuard } from './physiotherapists.guard';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';
import { UsersUtils } from '../users/users.utils';
import { PatientsService } from '../patients/patients.service';
import { AdminsService } from '../admins/admins.service';
import { patientsProviders } from '../patients/patients.providers';
import { PatientsUtils } from '../patients/patients.utils';
import { adminsProviders } from '../admins/admins.providers';
import { AdminsUtils } from '../admins/admins.utils';
import { CalendarModule } from '../calendar/calendar.module';
import { UsersModule } from '../users/users.module';
import { PatientsModule } from '../patients/patients.module';
import { AdminsModule } from '../admins/admins.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => CalendarModule),
    forwardRef(() => UsersModule),
    forwardRef(() => PatientsModule),
    forwardRef(() => AdminsModule),
  ],
  controllers: [PhysiotherapistsController],
  providers: [
    ...physiotherapistsProviders,
    ...usersProviders,
    ...patientsProviders,
    ...adminsProviders,
    PhysiotherapistsService,
    PhysiotherapistsUtils,
    PhysiotherapistsUserGuard,
    UsersService,
    UsersUtils,
    PatientsService,
    AdminsService,
    PatientsUtils,
    AdminsUtils,
  ],
  exports: [
    ...physiotherapistsProviders,
    PhysiotherapistsService,
    PhysiotherapistsModule,
    PhysiotherapistsUserGuard,
  ]
})
export class PhysiotherapistsModule {}
