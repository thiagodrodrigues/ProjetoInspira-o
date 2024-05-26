import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PhysiotherapistsEntity } from './entities/physiotherapists.entity';
import { PhysiotherapistsUtils } from './physiotherapists.utils';
import { UpdatePhysiotherapistsDto } from './dto/update-physiotherapists.dto';
import { UsersEntity } from '../users/entities/user.entity';
import { USERS_ERRORS } from 'src/shared/helpers/errors/users-errors.helpers';

@Injectable()
export class PhysiotherapistsService {
  constructor(
    @Inject('PHYSIOTHERAPISTS_REPOSITORY')
    private physiotherapistsRepository: Repository<PhysiotherapistsEntity>,
    private physiotherapistsUtils: PhysiotherapistsUtils,
  ) {}

  async updatePhysiotherapist(foundUser: UsersEntity, updatePhysiotherapistsDto: UpdatePhysiotherapistsDto){
    try {
      const physiotherapistFound = await this.physiotherapistsRepository.findOne({
        where: {
          users: {
            id: foundUser.id
          }
        },
      });

      if (!physiotherapistFound) {
        if(!updatePhysiotherapistsDto.crefito){
          throw new BadRequestException()
        }
        return this.physiotherapistsRepository.save(updatePhysiotherapistsDto);
      }
      return this.physiotherapistsRepository.save({
        ...physiotherapistFound,
        ...updatePhysiotherapistsDto,
      });
    } catch (e) {
      return this.physiotherapistsUtils.returnErrorPhysiotherapistsUpdate(e);
    }
  }

  async getPhysiotherapist(decoded: any): Promise<PhysiotherapistsEntity> {
    try {
      if(typeof decoded == `string`){
        throw new UnauthorizedException(USERS_ERRORS.userUnauthorized)
      }
      const foundUser: PhysiotherapistsEntity | null = await this.physiotherapistsRepository.findOne({
        where: {
          users: {id: decoded.id}
        },
      });
      if (!foundUser) {
        throw new BadRequestException(USERS_ERRORS.userNotExists);
      }
      return foundUser
    } catch (e) {
      this.physiotherapistsUtils.returnErrorPhysiotherapistsUpdate(e);
    }
  }

  async create(updatePhysiotherapistsDto: UpdatePhysiotherapistsDto) {
    try {
      const physioterapist_create = this.physiotherapistsRepository.create(updatePhysiotherapistsDto);
      const physioterapist_saved = await this.physiotherapistsRepository.save(physioterapist_create);
      return physioterapist_saved
    } catch (e) {
      this.physiotherapistsUtils.returnErrorPhysiotherapistsUpdate(e);
    }
  }

  async findOne(id: string) {
    try {
      const foundPhysiotherapist: PhysiotherapistsEntity | null = await this.physiotherapistsRepository.findOne({
        where: {
          users: {id: id}
        },
      });
      return foundPhysiotherapist
    } catch (e) {
      this.physiotherapistsUtils.returnErrorPhysiotherapistsUpdate(e);
    }
  }

  async remove(id: string) {
    try {
      const physiotherapistFound = await this.physiotherapistsRepository.findOneBy({ id });
      if (!physiotherapistFound) {
        throw new NotFoundException(USERS_ERRORS.userNotExists);
      }
      await this.physiotherapistsRepository.softRemove(physiotherapistFound);
      return;
    } catch (e) {
      return this.physiotherapistsUtils.returnErrorPhysiotherapistsUpdate(e);
    }
  }
}
