import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/user.entity';
import { UsersUtils } from './users.utils';
import { LoginUserDto } from './dto/login-user.dto';
import { USERS_ERRORS } from 'src/shared/helpers/errors/users-errors.helpers';
import { hashSync, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { TYPE_USER } from './users.enum';
import { PatientsService } from '../patients/patients.service';
import { AdminsService } from '../admins/admins.service';
import { PhysiotherapistsService } from '../physiotherapists/physiotherapists.service';
import { faker } from '@faker-js/faker';
import { USER_SUCCESSFUL } from 'src/shared/helpers/successful/users-successfuls.helpers';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<UsersEntity>,
    private usersUtil: UsersUtils,
    private patientsService: PatientsService,
    private adminsService: AdminsService,
    private physiotherapistsService: PhysiotherapistsService,
  ) {}

  async signIn(loginUserDto: LoginUserDto): Promise<{
    user: UsersEntity;
    token: string | null;
    permission: string;
  }> {
    try {
      loginUserDto.email = loginUserDto.email.toLowerCase();

      const foundUser: UsersEntity | null = await this.usersRepository.findOne({
        where: {
          email: loginUserDto.email,
        },
      });

      if (!foundUser) {
        throw new BadRequestException(USERS_ERRORS.userUnauthorized);
      }

      if(compareSync(loginUserDto.password, foundUser.password)){
        const user = {
          id: foundUser.id,
          name: foundUser.name,
          user_type: foundUser.user_type,
          email: foundUser.email,
          password: foundUser.password,
          owner: foundUser.owner
        }
        const token = jwt.sign(user, String(process.env.SECRET_KEY), {
          expiresIn: '2 days'
        });
        foundUser.password = undefined;

        return {
          user: foundUser,
          permission: foundUser.user_type,
          token: token
        };
      } else {
        throw new UnauthorizedException(USERS_ERRORS.userUnauthorized)
      }
    } catch (e) {
      this.usersUtil.returnErrorSingIn(e);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    try {
      createUserDto.email = createUserDto.email.toLowerCase();

      const foundUser: UsersEntity | null = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (foundUser) {
        throw new BadRequestException(USERS_ERRORS.userAlreadyExists);
      }

      createUserDto.password = hashSync(createUserDto.password, 10);
      
      const user_create = this.usersRepository.create(createUserDto);

      const user_saved = await this.usersRepository.save(user_create);

      return user_saved
      
    } catch (e) {
      this.usersUtil.returnErrorCreate(e);
    }
  }

  async userProfile(decoded: any): Promise<UsersEntity> {
    try {
      if(typeof decoded == `string`){
        throw new UnauthorizedException(USERS_ERRORS.userUnauthorized)
      }
      const foundUser: UsersEntity | null = await this.usersRepository.findOne({
        where: {
          id: decoded.id,
        },
      });
      if (!foundUser) {
        throw new BadRequestException(USERS_ERRORS.userNotExists);
      }
      foundUser.password = undefined
      return foundUser
    } catch (e) {
      this.usersUtil.returnErrorSingIn(e);
    }
  }

  async userType(id: string, type_user: string): Promise<UsersEntity> {
    try {
      let foundUser = undefined
      if(type_user == TYPE_USER.patient){
        foundUser = await this.usersRepository.findOne({
          where: {
            patient: {
              id: id
            },
          },
        });
      }
      if(type_user == TYPE_USER.physiotherapist){
        foundUser = await this.usersRepository.findOne({
          where: {
            physiotherapist: {
              id: id
            },
          },
        });
      }
      foundUser.password = undefined
      return foundUser
    } catch (e) {
      this.usersUtil.returnErrorSingIn(e);
    }
  }

  async updateProfile(decoded: any, updateUserDto: UpdateUserDto): Promise<UsersEntity> {
    try {
      if(typeof decoded == `string`){
        throw new UnauthorizedException(USERS_ERRORS.userUnauthorized)
      }
      const foundUser: UsersEntity | null = await this.usersRepository.findOne({
        where: {
          id: decoded.id,
        },
      });
      if (!foundUser) {
        throw new BadRequestException(USERS_ERRORS.userNotExists);
      }
      let pass = undefined;
      if(updateUserDto.password){
        pass = hashSync(updateUserDto.password, 10)
      }
      let updateUser = {
        name: updateUserDto.name || undefined,
        email: updateUserDto.email || undefined,
        password: pass,
        patient: null,
        physiotherapist: null,
        admin: null,
      }
      if (foundUser.user_type == TYPE_USER.patient) {
        if(updateUserDto.patient){
          const updatePatient = {
            birth: updateUserDto.patient.birth || undefined,
            comments: updateUserDto.patient.comments || undefined,
            condition: updateUserDto.patient.condition || undefined,
            lifestyle: updateUserDto.patient.lifestyle || undefined,
            medical: updateUserDto.patient.medical || undefined,
            phone: updateUserDto.patient.phone || undefined,
            profession: updateUserDto.patient.profession || undefined,
            sex: updateUserDto.patient.sex || undefined,
            users: foundUser,
          }
          updateUser.patient = await this.patientsService.updatePatients(foundUser, updatePatient)
          updateUser.patient.users = undefined
        }
      } else if (foundUser.user_type == TYPE_USER.physiotherapist) {
        if(updateUserDto.physiotherapist){
          const updatePhysiotherapist = {
            crefito: updateUserDto.physiotherapist.crefito || undefined,
            users: foundUser,
          }
          updateUser.physiotherapist = await this.physiotherapistsService.updatePhysiotherapist(foundUser, updatePhysiotherapist)
          updateUser.physiotherapist.users = undefined
        }
      } else if (foundUser.user_type == TYPE_USER.admin) {
        if(updateUserDto.admin){
          const updateAdmin = {
            crefito: updateUserDto.admin.permission || undefined,
            users: foundUser,
          }
          updateUser.admin = await this.adminsService.updateAdmin(foundUser, updateAdmin)
          updateUser.admin.users = undefined
        }
      }
      const response = await this.usersRepository.save({
        ...foundUser,
        ...updateUser,
      });
      return response
    } catch (e) {
      this.usersUtil.returnErrorSingIn(e);
    }
  }

  async deleteUser(decoded: any) {
    try {
      if(typeof decoded == `string`){
        throw new UnauthorizedException(USERS_ERRORS.userUnauthorized)
      }
      const foundUser: UsersEntity | null = await this.usersRepository.findOne({
        where: {
          id: decoded.id,
        },
      });
      if (!foundUser) {
        throw new BadRequestException(USERS_ERRORS.userNotExists);
      }
      const anonymizeUser = {
        name: `${faker.person.firstName()} - USUÁRIO ANONIMIZADO`,
        email: faker.internet.email().toLowerCase(),
        password: hashSync(faker.internet.password(), 10)
      };
      if(foundUser.user_type == TYPE_USER.patient){
        const anonymizepatient = {
          phone: faker.helpers.fromRegExp('+55 (31)-9[0-9]{4}-[0-9]{4}'),
        };
        await this.patientsService.updatePatients(foundUser, anonymizepatient);
      }
      await this.usersRepository.save({
        ...foundUser,
        ...anonymizeUser,
      });
      return { message: USER_SUCCESSFUL.userDeletedWithSuccessful };
    } catch (e) {
      return this.usersUtil.returnErrorDisableUser(e);
    }
  }
}
