import { DataSource } from 'typeorm';
import { AdminsEntity } from './entities/admin.entity';

export const adminsProviders = [
  {
    provide: 'ADMIN_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AdminsEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ADMINS_USER_GUARD',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AdminsEntity),
    inject: ['DATA_SOURCE'],
  },
];