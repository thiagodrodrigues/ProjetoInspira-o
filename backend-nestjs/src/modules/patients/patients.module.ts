import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { DatabaseModule } from '../database/database.module';
import { patientsProviders } from './patients.providers';
import { PatientsUtils } from './patients.utils';
import { PhysiotherapistsUserGuard } from '../physiotherapists/physiotherapists.guard';
import { physiotherapistsProviders } from '../physiotherapists/physiotherapists.providers';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';
import { UsersUtils } from '../users/users.utils';
import { AdminsService } from '../admins/admins.service';
import { PhysiotherapistsService } from '../physiotherapists/physiotherapists.service';
import { adminsProviders } from '../admins/admins.providers';
import { AdminsUtils } from '../admins/admins.utils';
import { PhysiotherapistsUtils } from '../physiotherapists/physiotherapists.utils';
import { PatientsUserGuard } from './patients.guard';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [PatientsController],
  providers: [
    ...patientsProviders,
    ...physiotherapistsProviders,
    ...usersProviders,
    ...adminsProviders,
    PatientsService,
    PatientsUtils,
    PhysiotherapistsUserGuard,
    UsersService,
    UsersUtils,
    AdminsService,
    PhysiotherapistsService,
    AdminsUtils,
    PhysiotherapistsUtils,
    PatientsUserGuard,
  ],
  exports: [
    ...patientsProviders,
    PatientsService,
    PatientsModule,
    PatientsUserGuard,
  ]
})
export class PatientsModule {}
