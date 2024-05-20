import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { DatabaseModule } from '../database/database.module';
import { AppointmentsUtils } from './appointment.utils';
import { appointmentsProviders } from './appointment.providers';
import { CalendarService } from '../calendar/calendar.service';
import { calendarsProviders } from '../calendar/calendar.providers';
import { CalendarsUtils } from '../calendar/calendar.utils';
import { PhysiotherapistsService } from '../physiotherapists/physiotherapists.service';
import { physiotherapistsProviders } from '../physiotherapists/physiotherapists.providers';
import { PhysiotherapistsUtils } from '../physiotherapists/physiotherapists.utils';
import { PatientsUserGuard } from '../patients/patients.guard';
import { patientsProviders } from '../patients/patients.providers';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';
import { UsersUtils } from '../users/users.utils';
import { PatientsService } from '../patients/patients.service';
import { PatientsUtils } from '../patients/patients.utils';
import { AdminsService } from '../admins/admins.service';
import { adminsProviders } from '../admins/admins.providers';
import { AdminsUtils } from '../admins/admins.utils';
import { PhysiotherapistsUserGuard } from '../physiotherapists/physiotherapists.guard';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AppointmentController],
  providers: [
    ...appointmentsProviders,
    ...calendarsProviders,
    ...physiotherapistsProviders,
    ...patientsProviders,
    ...usersProviders,
    ...adminsProviders,
    PatientsUserGuard,
    AppointmentService,
    AppointmentsUtils,
    CalendarService,
    CalendarsUtils,
    PhysiotherapistsService,
    PhysiotherapistsUtils,
    PhysiotherapistsUserGuard,
    PatientsService,
    PatientsUtils,
    AdminsService,
    AdminsUtils,
    UsersService,
    UsersUtils,
  ],
})
export class AppointmentModule {}
