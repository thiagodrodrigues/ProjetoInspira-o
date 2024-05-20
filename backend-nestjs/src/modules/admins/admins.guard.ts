import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { AdminsEntity } from './entities/admin.entity';

@Injectable()
export class AdminsUserGuard implements CanActivate {
  constructor(
    @Inject('ADMINS_USER_GUARD')
    private adminsRepository: Repository<AdminsEntity>,
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
    const foundToken = await this.adminsRepository.findOne({
      where: {
        users: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email
        },
      }
    });
    if(!foundToken){
      return false
    }
    return true
  }
}
