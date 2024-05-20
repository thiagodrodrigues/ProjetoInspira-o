import { DataSource } from 'typeorm';
import { PatientsEntity } from './entities/patients.entity';

export const patientsProviders = [
  {
    provide: 'PATIENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PatientsEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PATIENT_USER_GUARD',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PatientsEntity),
    inject: ['DATA_SOURCE'],
  },
];