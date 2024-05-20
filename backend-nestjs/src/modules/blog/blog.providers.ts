import { DataSource } from 'typeorm';
import { BlogEntity } from './entities/blog.entity';

export const blogProviders = [
  {
    provide: 'BLOG_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BlogEntity),
    inject: ['DATA_SOURCE'],
  },
];