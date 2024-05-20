import { DataSource } from 'typeorm';
import { PhysiotherapistsEntity } from './entities/physiotherapists.entity';

export const physiotherapistsProviders = [
  {
    provide: 'PHYSIOTHERAPISTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PhysiotherapistsEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PHYSIOTHERAPISTS_USER_GUARD',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PhysiotherapistsEntity),
    inject: ['DATA_SOURCE'],
  },
];