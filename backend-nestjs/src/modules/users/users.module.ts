import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { AdminsModule } from '../admins/admins.module';
import { PhysiotherapistsModule } from '../physiotherapists/physiotherapists.module';
import { PatientsModule } from '../patients/patients.module';
import { UsersUtils } from './users.utils';
import { PatientsUserGuard } from '../patients/patients.guard';
import { AdminsUserGuard } from '../admins/admins.guard';
import { PhysiotherapistsUserGuard } from '../physiotherapists/physiotherapists.guard';
import { PatientsService } from '../patients/patients.service';
import { AdminsService } from '../admins/admins.service';
import { PhysiotherapistsService } from '../physiotherapists/physiotherapists.service';
import { patientsProviders } from '../patients/patients.providers';
import { adminsProviders } from '../admins/admins.providers';
import { physiotherapistsProviders } from '../physiotherapists/physiotherapists.providers';
import { PatientsUtils } from '../patients/patients.utils';
import { AdminsUtils } from '../admins/admins.utils';
import { PhysiotherapistsUtils } from '../physiotherapists/physiotherapists.utils';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [
    ...usersProviders,
    ...patientsProviders,
    ...adminsProviders,
    ...physiotherapistsProviders,
    UsersService,
    UsersUtils,
    PatientsUserGuard,
    AdminsUserGuard,
    PhysiotherapistsUserGuard,
    PatientsService,
    AdminsService,
    PhysiotherapistsService,
    PatientsUtils,
    AdminsUtils,
    PhysiotherapistsUtils,
  ],
  exports: [
    UsersModule,
    UsersService,
    UsersUtils,
  ]
})
export class UsersModule {}
