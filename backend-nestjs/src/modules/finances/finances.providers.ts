import { DataSource } from 'typeorm';
import { FinanceEntity } from './entities/finance.entity';
import { CashEntity } from './entities/cash.entity';

export const fincancesProviders = [
  {
    provide: 'FINANCES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FinanceEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CASH_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CashEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'VARIABLE_FIELD_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CashEntity),
    inject: ['DATA_SOURCE'],
  },
];