import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { USERS_ERRORS } from 'src/shared/helpers/errors/users-errors.helpers';

export class ActivitiesUtils {
  returnErrorContactCreate(e: any) {
    if (e.response.message === USERS_ERRORS.userForbidden) {
      throw new ForbiddenException(USERS_ERRORS.userForbidden)
    } else {
      throw new InternalServerErrorException('Aconteceu um imprevisto');
    }
  }
}
