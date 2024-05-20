import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { USERS_ERRORS } from 'src/shared/helpers/errors/users-errors.helpers';

export class PatientsUtils {
  returnErrorPatientUpdate(e: any) {
    if (e.response.message === USERS_ERRORS.userNotExists) {
      throw new UnauthorizedException(USERS_ERRORS.userNotExists);
    } else if (e.response.message === USERS_ERRORS.userUnauthorized) {
      throw new UnauthorizedException(USERS_ERRORS.userUnauthorized);
    } else {
      throw new InternalServerErrorException('Aconteceu um imprevisto');
    }
  }

  returnErrorCreate(e: any) {
    if (e.response.message === USERS_ERRORS.userAlreadyExists) {
      throw new BadRequestException(USERS_ERRORS.userAlreadyExists);
    } else {
      throw new InternalServerErrorException('Aconteceu um imprevisto');
    }
  }

  returnErrorGetPatients(e: any) {
    if (e.response.message === USERS_ERRORS.userAlreadyExists) {
      throw new BadRequestException(USERS_ERRORS.userAlreadyExists);
    } else {
      throw new InternalServerErrorException('Aconteceu um imprevisto');
    }
  }
}
