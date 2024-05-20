import { DataSource } from 'typeorm';
import { UsersEntity } from './entities/user.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UsersEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'OWNER_USER_GUARD',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UsersEntity),
    inject: ['DATA_SOURCE'],
  },
];