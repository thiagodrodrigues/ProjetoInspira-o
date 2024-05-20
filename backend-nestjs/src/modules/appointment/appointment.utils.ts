import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { APPOINTMENTS_ERRORS } from 'src/shared/helpers/errors/appointments-errors.helpers';
import { CALENDARS_ERRORS } from 'src/shared/helpers/errors/calendars-errors.helpers';
import { USERS_ERRORS } from 'src/shared/helpers/errors/users-errors.helpers';

export class AppointmentsUtils {
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
    if (e.response.message === USERS_ERRORS.userNotExists) {
      throw new BadRequestException(USERS_ERRORS.userNotExists);
    } else if (e.response.message === CALENDARS_ERRORS.calendarNotExists) {
      throw new BadRequestException(CALENDARS_ERRORS.calendarNotExists);
    } else if (e.response.message === APPOINTMENTS_ERRORS.dateUnavailable) {
      throw new BadRequestException(APPOINTMENTS_ERRORS.dateUnavailable);
    } else {
      throw new InternalServerErrorException('Aconteceu um imprevisto');
    }
  }
}
