import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdminsEntity } from './entities/admin.entity';
import { AdminsUtils } from './admins.utils';
import { UpdateAdminsDto } from './dto/update-admins.dto';
import { UsersEntity } from '../users/entities/user.entity';
import { USERS_ERRORS } from 'src/shared/helpers/errors/users-errors.helpers';

@Injectable()
export class AdminsService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private adminsRepository: Repository<AdminsEntity>,
    private adminsUtils: AdminsUtils,
  ) {}

  async updateAdmin(foundUser: UsersEntity, updateAdminsDto: UpdateAdminsDto){
    try {
      const adminFound = await this.adminsRepository.findOne({
        where: {
          users: {
            id: foundUser.id
          }
        },
      });

      if (!adminFound) {
        return this.adminsRepository.save(updateAdminsDto);
      }
      return this.adminsRepository.save({
        ...adminFound,
        ...updateAdminsDto,
      });
    } catch (e) {
      return this.adminsUtils.returnErrorAdminUpdate(e);
    }
  }

  async createAdmin(updateAdminsDto: UpdateAdminsDto) {
    try {
      const admin_create = this.adminsRepository.create(updateAdminsDto);
      const adminCreated = await this.adminsRepository.save(admin_create);
      return adminCreated
    } catch (e) {
      this.adminsUtils.returnErrorAdminUpdate(e);
    }
  }

  async remove(id: string) {
    try {
      const adminFound = await this.adminsRepository.findOneBy({ id });
      if (!adminFound) {
        throw new NotFoundException(USERS_ERRORS.userNotExists);
      }
      await this.adminsRepository.softRemove(adminFound);
      return;
    } catch (e) {
      return this.adminsUtils.returnErrorAdminUpdate(e);
    }
  }
}
