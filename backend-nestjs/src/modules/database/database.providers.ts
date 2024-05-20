import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
let migrationsDir: string;

if (process.env.NODE_ENV !== 'production') {
  migrationsDir = 'dist/shared/typeorm/migrations/*';
} else {
  migrationsDir = 'dist/shared/typeorm/migrations/*';
}

export const resource: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: [migrationsDir],
  entities: ['dist/modules/**/entities/*.js'],
  synchronize: false,
};

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(resource);

      return dataSource.initialize();
    },
  },
];

export const dataSource: DataSource = new DataSource(resource);
