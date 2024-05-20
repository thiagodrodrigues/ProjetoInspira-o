import { DataSource } from 'typeorm';
import { CalendarsEntity } from './entities/calendar.entity';

export const calendarsProviders = [
  {
    provide: 'CALENDARS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CalendarsEntity),
    inject: ['DATA_SOURCE'],
  },
];