import { Module, forwardRef } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { DatabaseModule } from '../database/database.module';
import { calendarsProviders } from './calendar.providers';
import { CalendarsUtils } from './calendar.utils';
import { PhysiotherapistsModule } from '../physiotherapists/physiotherapists.module';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';
import { UsersUtils } from '../users/users.utils';
import { PatientsService } from '../patients/patients.service';
import { AdminsService } from '../admins/admins.service';
import { patientsProviders } from '../patients/patients.providers';
import { PatientsUtils } from '../patients/patients.utils';
import { adminsProviders } from '../admins/admins.providers';
import { AdminsUtils } from '../admins/admins.utils';
import { PatientsUserGuard } from '../patients/patients.guard';
import { PhysiotherapistsUserGuard } from '../physiotherapists/physiotherapists.guard';
import { PhysiotherapistsService } from '../physiotherapists/physiotherapists.service';
import { physiotherapistsProviders } from '../physiotherapists/physiotherapists.providers';
import { PhysiotherapistsUtils } from '../physiotherapists/physiotherapists.utils';

@Module({  
  imports: [
    DatabaseModule,
  ],
  controllers: [CalendarController],
  providers: [
    ...calendarsProviders,
    ...usersProviders,
    ...patientsProviders,
    ...adminsProviders,
    ...physiotherapistsProviders,
    CalendarService,
    CalendarsUtils,
    UsersService,
    UsersUtils,
    PatientsService,
    AdminsService,
    PatientsUtils,
    AdminsUtils,
    PatientsUserGuard,
    PhysiotherapistsUserGuard,
    PhysiotherapistsService,
    PhysiotherapistsUtils,
  ],
  exports: [
    CalendarModule
  ]
})
export class CalendarModule {}
