import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdminsEntity } from './entities/admin.entity';
import { AdminsUtils } from './admins.utils';
import { UpdateAdminsDto } from './dto/update-admins.dto';
import { UsersEntity } from '../users/entities/user.entity';

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
}
