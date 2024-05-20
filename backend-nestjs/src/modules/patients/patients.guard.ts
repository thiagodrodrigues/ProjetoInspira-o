import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { PatientsEntity } from './entities/patients.entity';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { TYPE_USER } from '../users/users.enum';

@Injectable()
export class PatientsUserGuard implements CanActivate {
  constructor(
    @Inject('PATIENT_USER_GUARD')
    private patientsRepository: Repository<PatientsEntity>,
    private usersService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization'];
    if (!token) return false;

    return this.validateToken(token);
  }

  async validateToken(token: string): Promise<boolean> {
    const splittedToken = token.split(' ');
    const decoded = jwt.verify(splittedToken[1], String(process.env.SECRET_KEY));
    if(typeof decoded == `string`){
      return false
    }
    const foundPatient = await this.patientsRepository.findOne({
      where: {
        users: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email
        },
      }
    });
    if(!foundPatient) {
      const foundUserGeneral = await this.usersService.userProfile(decoded);
      if(foundUserGeneral.user_type !== TYPE_USER.patient){
        return false
      } 
    }
    return true
  }
}
