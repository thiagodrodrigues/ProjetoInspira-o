import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { PatientsEntity } from './entities/patients.entity';
import { PatientsUtils } from './patients.utils';
import { UsersEntity } from '../users/entities/user.entity';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UpdatePatientDto } from './dto/update-patients.dto';
import { FiltersPaginationDto } from 'src/shared/dto/filters-pagination.dto';

@Injectable()
export class PatientsService {
  constructor(
    @Inject('PATIENTS_REPOSITORY')
    private patientsRepository: Repository<PatientsEntity>,
    private patientsUtil: PatientsUtils,
  ) {}

  async updatePatients(foundUser: UsersEntity, updatePatientDto: UpdatePatientDto){
    try {
      const patientFound = await this.patientsRepository.findOne({
        where: {
          users: {
            id: foundUser.id
          }
        },
      });

      if (!patientFound) {
        if(!updatePatientDto.birth || !updatePatientDto.condition){
          throw new BadRequestException()
        }
        return this.patientsRepository.save(updatePatientDto);
      }
      return this.patientsRepository.save({
        ...patientFound,
        ...updatePatientDto,
      });
    } catch (e) {
      return this.patientsUtil.returnErrorPatientUpdate(e);
    }
  }

  async getAllPatients(filtersDTO: FiltersPaginationDto, decoded: any): Promise<any> {
    try {
      const { pageSize, pageIndex } = filtersDTO;
      let { filter } = filtersDTO;

      if (!filter) {
        filter = '';
      }
      const [patientsFiltered, total] =
        await this.patientsRepository.findAndCount({
          relations: ['users'],
          where: {
            users: {
              name: Like(`%${filter}%`)
            },
            physiotherapists: {
              users: {id: decoded.id}
            }
          },

          order: {
            created_at: 'DESC',
          },
          skip: pageIndex * pageSize || 0,
          take: pageSize || 100,
        });
        for(const patient of patientsFiltered){
          patient.users.password = undefined;
          patient.users.patient = undefined
        }
      return { total, patientsFiltered };
    } catch (e) {
      console.log(e)
      return this.patientsUtil.returnErrorGetPatients(e);
    }
  }
}
