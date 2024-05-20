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
import { PhysiotherapistsEntity } from './entities/physiotherapists.entity';
import { UsersService } from '../users/users.service';
import { TYPE_USER } from '../users/users.enum';

@Injectable()
export class PhysiotherapistsUserGuard implements CanActivate {
  constructor(
    @Inject('PHYSIOTHERAPISTS_USER_GUARD')
    private physiotherapistsRepository: Repository<PhysiotherapistsEntity>,
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
    const foundPhysiotherapist = await this.physiotherapistsRepository.findOne({
      where: {
        users: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email
        },
      }
    });
    if(!foundPhysiotherapist) {
      const foundUserGeneral = await this.usersService.userProfile(decoded);
      if(foundUserGeneral.user_type !== TYPE_USER.physiotherapist){
        return false
      } 
    }
    return true
  }
}
