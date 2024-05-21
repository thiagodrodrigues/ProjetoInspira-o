import { DataSource } from 'typeorm';
import { ActivityEntity } from './entities/activity.entity';

export const activitiesProviders = [
  {
    provide: 'ACTIVITY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ActivityEntity),
    inject: ['DATA_SOURCE'],
  },
];