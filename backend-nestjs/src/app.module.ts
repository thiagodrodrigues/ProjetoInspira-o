import { Module, OnModuleInit, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AdminsModule } from './modules/admins/admins.module';
import { PatientsModule } from './modules/patients/patients.module';
import { PhysiotherapistsModule } from './modules/physiotherapists/physiotherapists.module';
import { ConfigModule } from '@nestjs/config';
import { usersProviders } from './modules/users/users.providers';
import { adminsProviders } from './modules/admins/admins.providers';
import { patientsProviders } from './modules/patients/patients.providers';
import { physiotherapistsProviders } from './modules/physiotherapists/physiotherapists.providers';
import { DatabaseModule } from './modules/database/database.module';
import { SwaggerModule } from '@nestjs/swagger';
import { CalendarModule } from './modules/calendar/calendar.module';
import { calendarsProviders } from './modules/calendar/calendar.providers';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { appointmentsProviders } from './modules/appointment/appointment.providers';
import { ContactModule } from './modules/contact/contact.module';
import { BlogModule } from './modules/blog/blog.module';
import { ActivitiesModule } from './modules/activities/activities.module';
const envModule = ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [
    envModule,
    UsersModule, 
    AdminsModule, 
    PatientsModule, 
    PhysiotherapistsModule,
    DatabaseModule,
    SwaggerModule,
    forwardRef(() => CalendarModule),
    AppointmentModule,
    ContactModule,
    BlogModule,
    ActivitiesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...usersProviders,
    ...adminsProviders,
    ...patientsProviders,
    ...physiotherapistsProviders,
    ...calendarsProviders,
    ...appointmentsProviders,
  ],
})

export class AppModule implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
  ) {}

  async onModuleInit() {
    await this.appService.seed();
  }
}
