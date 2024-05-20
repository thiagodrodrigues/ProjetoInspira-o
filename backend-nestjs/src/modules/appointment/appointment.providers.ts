import { DataSource } from 'typeorm';
import { AppointmentEntity } from './entities/appointment.entity';

export const appointmentsProviders = [
  {
    provide: 'APPOINTMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AppointmentEntity),
    inject: ['DATA_SOURCE'],
  },
];