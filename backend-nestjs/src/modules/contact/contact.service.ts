import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { FiltersPaginationDto } from 'src/shared/dto/filters-pagination.dto';
import { Like, Repository } from 'typeorm';
import { ContactEntity } from './entities/contact.entity';
import { ContactUtils } from './contact.utils';
import { USERS_ERRORS } from 'src/shared/helpers/errors/users-errors.helpers';

@Injectable()
export class ContactService {
  constructor(
    @Inject('CONTACT_REPOSITORY')
    private contactRepository: Repository<ContactEntity>,
    private contactUtils: ContactUtils,
  ) {}

  async create(createContactDto: CreateContactDto) {
    try {
      const contact_create = this.contactRepository.create(createContactDto);
      const contact_saved = await this.contactRepository.save(contact_create);
      return contact_saved
    } catch (e) {
      this.contactUtils.returnErrorContactCreate(e);
    }
  }

  async findAll(filtersDTO: FiltersPaginationDto, read?: string): Promise<any> {
    try {
      const { pageSize, pageIndex } = filtersDTO;
      let { filter } = filtersDTO;

      if (!filter) {
        filter = '';
      }
      let patientsFiltered = undefined
      let total = undefined
      if(read == 'true'){
        [patientsFiltered, total] =
        await this.contactRepository.find({
          where: [
          {
            name: Like(`%${filter}%`),
            read: true,
          },
          {
            email: Like(`%${filter}%`),
            read: true,
          },
          {
            message: Like(`%${filter}%`),
            read: true,
          },
        ],
          order: {
            created_at: 'DESC',
          },
          skip: pageIndex * pageSize || 0,
          take: pageSize || 100,
        });
      } else if(read == 'false'){
        [patientsFiltered, total] =
        await this.contactRepository.find({
          where: [
          {
            name: Like(`%${filter}%`),
            read: false,
          },
          {
            email: Like(`%${filter}%`),
            read: false,
          },
          {
            message: Like(`%${filter}%`),
            read: false,
          },
        ],
          order: {
            created_at: 'DESC',
          },
          skip: pageIndex * pageSize || 0,
          take: pageSize || 100,
        });
      } else {
        [patientsFiltered, total] =
        await this.contactRepository.findAndCount({
          where: {
            name: Like(`%${filter}%`),
            email: Like(`%${filter}%`),
            message: Like(`%${filter}%`),
          },
          order: {
            created_at: 'DESC',
          },
          skip: pageIndex * pageSize || 0,
          take: pageSize || 100,
        });
      }
      return { total, patientsFiltered };
    } catch (e) {
      return this.contactUtils.returnErrorContactCreate(e);
    }
  }

  async findOne(id: string) {
    try {
      const foundContact: ContactEntity | null = await this.contactRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!foundContact) {
        throw new BadRequestException(USERS_ERRORS.contactNotExists);
      }
      foundContact.read = true
      const contact_update = this.contactRepository.create(foundContact);
      const contact_saved = await this.contactRepository.save(contact_update);
      return foundContact
    } catch (e) {
      this.contactUtils.returnErrorContactCreate(e);
    }
  }

  async remove(id: string) {
    try {
      const contactFound = await this.contactRepository.findOneBy({ id });
      if (!contactFound) {
        throw new NotFoundException(USERS_ERRORS.contactNotFound);
      }
      await this.contactRepository.softRemove(contactFound);
      return;
    } catch (e) {
      return this.contactUtils.returnErrorContactCreate(e);
    }
  }
}
