import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { DatabaseModule } from '../database/database.module';
import { contactProviders } from './contact.providers';
import { ContactUtils } from './contact.utils';
import { PhysiotherapistsUserGuard } from '../physiotherapists/physiotherapists.guard';
import { physiotherapistsProviders } from '../physiotherapists/physiotherapists.providers';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';
import { UsersUtils } from '../users/users.utils';
import { PatientsService } from '../patients/patients.service';
import { AdminsService } from '../admins/admins.service';
import { PhysiotherapistsService } from '../physiotherapists/physiotherapists.service';
import { PhysiotherapistsUtils } from '../physiotherapists/physiotherapists.utils';
import { patientsProviders } from '../patients/patients.providers';
import { PatientsUtils } from '../patients/patients.utils';
import { adminsProviders } from '../admins/admins.providers';
import { AdminsUtils } from '../admins/admins.utils';
import { OwnerUserGuard } from '../users/owner.guard';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [ContactController],
  providers: [
    ...contactProviders,
    ...physiotherapistsProviders,
    ...usersProviders,
    ...patientsProviders,
    ...adminsProviders,
    ContactService,
    ContactUtils,
    PhysiotherapistsUserGuard,
    PhysiotherapistsService,
    PhysiotherapistsUtils,
    UsersService,
    UsersUtils,
    OwnerUserGuard,
    PatientsService,
    PatientsUtils,
    AdminsService,
    AdminsUtils,
  ],
})
export class ContactModule {}
