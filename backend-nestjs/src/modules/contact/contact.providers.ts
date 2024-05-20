import { DataSource } from 'typeorm';
import { ContactEntity } from './entities/contact.entity';

export const contactProviders = [
  {
    provide: 'CONTACT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ContactEntity),
    inject: ['DATA_SOURCE'],
  },
];