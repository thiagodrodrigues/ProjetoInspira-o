import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentEntity } from './entities/appointment.entity';
import { AppointmentsUtils } from './appointment.utils';
import { CalendarService } from '../calendar/calendar.service';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { STATUS_APPOINTMENTS } from 'src/shared/constants/status.appointment.enum';
import * as dayjs from 'dayjs';
import { AVAILABLE_CALENDAR } from '../calendar/calendar.enum';
import { APPOINTMENTS_ERRORS } from 'src/shared/helpers/errors/appointments-errors.helpers';
import { UsersService } from '../users/users.service';
import { USERS_ERRORS } from 'src/shared/helpers/errors/users-errors.helpers';
import { TYPE_USER } from '../users/users.enum';
import { CALENDARS_ERRORS } from 'src/shared/helpers/errors/calendars-errors.helpers';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('APPOINTMENT_REPOSITORY')
    private appointmentRepository: Repository<AppointmentEntity>,
    private appointmentsUtils: AppointmentsUtils,
    private calendarService: CalendarService,
    private userService: UsersService,
  ) {}

  async create(decoded: any, createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity | void> {
    try {
      const foundUser = await this.userService.userProfile(decoded);
      if (!foundUser) {
        throw new BadRequestException(USERS_ERRORS.userNotExists);
      }
      let userIdDto = undefined
      let typeUserDto = undefined
      if(foundUser.user_type == TYPE_USER.patient){
        createAppointmentDto.patientId = foundUser.patient.id
        userIdDto = createAppointmentDto.physiotherapistId
        typeUserDto = TYPE_USER.physiotherapist
      } else if(foundUser.user_type == TYPE_USER.physiotherapist){
        createAppointmentDto.physiotherapistId == foundUser.physiotherapist.id
        userIdDto = createAppointmentDto.patientId
        typeUserDto = TYPE_USER.patient
      }
      const foundUserAux = await this.userService.userType(userIdDto, typeUserDto);
      if (!foundUserAux) {
        throw new BadRequestException(USERS_ERRORS.userNotExists);
      }
      const foundCalendar = await this.calendarService.findOne(createAppointmentDto.calendarId)
      if (!foundCalendar) {
        throw new BadRequestException(CALENDARS_ERRORS.calendarNotExists);
      }
      if(foundCalendar.available !== AVAILABLE_CALENDAR.FREE && foundCalendar.available !==  AVAILABLE_CALENDAR.CANCELED) {
        throw new BadRequestException(APPOINTMENTS_ERRORS.dateUnavailable);
      }
      const appointmentcCeate = this.appointmentRepository.create({
        calendar: {id: createAppointmentDto.calendarId},
        physiotherapistId: createAppointmentDto.physiotherapistId,
        patientId: createAppointmentDto.patientId
      });
      const appointmentSaved = await this.appointmentRepository.save(appointmentcCeate);
      await this.calendarService.updateAvailableCalendar(createAppointmentDto.calendarId, AVAILABLE_CALENDAR.SCHEDULED)
      return appointmentSaved
    }
    catch (e) {
      return this.appointmentsUtils.returnErrorGetPatients(e);
    }
  }

  async findAllAppointmentByPatient(decoded: any, status: STATUS_APPOINTMENTS): Promise<AppointmentEntity[] | void>  {
    try {
      const foundUser = await this.userService.userProfile(decoded);
      if (!foundUser) {
        throw new BadRequestException(USERS_ERRORS.userNotExists);
      }
      let appointmentsFound: AppointmentEntity[];
      const searchDate = dayjs().format('YYYY-MM-DD');
      if (status === STATUS_APPOINTMENTS.FUTURE) {
        appointmentsFound = await this.appointmentRepository.find({
          relations: ['calendar'],
          select: ['id', 'physiotherapistId', 'patientId', 'activies', 'calendar', 'comments'],
          where: {
            patientId: foundUser.patient.id,
            calendar: {
              date: MoreThanOrEqual(searchDate),
              available: AVAILABLE_CALENDAR.SCHEDULED
            }
          },
          order: {
            created_at: 'DESC',
          },
        });
      } else if (status === STATUS_APPOINTMENTS.PAST) {
        appointmentsFound = await this.appointmentRepository.find({
          relations: ['calendar'],
          select: ['id', 'physiotherapistId', 'patientId', 'activies', 'calendar', 'comments'],
          where: {
            patientId: foundUser.patient.id,
            calendar: [
            {
              date: LessThanOrEqual(searchDate),
              available: AVAILABLE_CALENDAR.COMPLETED
            },
            {
              date: LessThanOrEqual(searchDate),
              available: AVAILABLE_CALENDAR.MISSING
            },
          ]
          },
          order: {
            created_at: 'DESC',
          },
        });
      }
      return appointmentsFound;
    } catch (e) {
      return this.appointmentsUtils.returnErrorGetPatients(e);
    }
  }

  async findOneAppointment(id: string) {
    try {
      const foundAppointment: AppointmentEntity | null = await this.appointmentRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!foundAppointment) {
        throw new BadRequestException(USERS_ERRORS.contactNotExists);
      }
      return foundAppointment
    } catch (e) {
      this.appointmentsUtils.returnErrorCreate(e);
    }
  }

  async findAllAppointmentByPhysioterapist(decoded: any, status: STATUS_APPOINTMENTS): Promise<AppointmentEntity[] | void>  {
    try {
      let appointmentsFound: AppointmentEntity[];
      const searchDate = dayjs().format('YYYY-MM-DD');
      if (status === STATUS_APPOINTMENTS.FUTURE) {
        appointmentsFound = await this.appointmentRepository.find({
          relations: ['calendar'],
          where: {
            physiotherapistId: decoded.id,
            calendar: {
              date: MoreThanOrEqual(searchDate)
            }
          },
          order: {
            created_at: 'DESC',
          },
        });
      } else if (status === STATUS_APPOINTMENTS.PAST) {
        appointmentsFound = await this.appointmentRepository.find({
          relations: ['calendar'],
          where: {
            physiotherapistId: decoded.id,
            calendar: [
            {
              date: LessThanOrEqual(searchDate)
            },
          ]
          },
          order: {
            created_at: 'DESC',
          },
        });
      } else if (status === STATUS_APPOINTMENTS.TODAY) {
        appointmentsFound = await this.appointmentRepository.find({
          relations: ['calendar'],
          where: {
            physiotherapistId: decoded.id,
            calendar: [
            {
              date: searchDate,
            },
          ]
          },
          order: {
            created_at: 'DESC',
          },
        });
      }
      return appointmentsFound;
    } catch (e) {
      return this.appointmentsUtils.returnErrorGetPatients(e);
    }
  }

  async findOne(id: string) {
    try {
      const foundAppointment: AppointmentEntity[] | null = await this.appointmentRepository.find({
        where: {
          patientId: id,
        },
      });
      if (!foundAppointment) {
        throw new BadRequestException(USERS_ERRORS.contactNotExists);
      }
      return foundAppointment
    } catch (e) {
      this.appointmentsUtils.returnErrorGetPatients(e);
    }
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      const foundAppointment: AppointmentEntity | null = await this.appointmentRepository.findOne({
        relations: ['calendar'],
        where: {
          id: id,
        },
      })
      if (!foundAppointment) {
        throw new BadRequestException(USERS_ERRORS.contactNotExists);
      }
      await this.calendarService.updateAvailableCalendar(foundAppointment.calendar.id, updateAppointmentDto.status)
      if(foundAppointment.calendar.available == AVAILABLE_CALENDAR.SCHEDULED && updateAppointmentDto.status == AVAILABLE_CALENDAR.CANCELED){
        await this.appointmentRepository.save({
          ...foundAppointment,
          calendar: null
        });
        return this.appointmentRepository.softRemove(foundAppointment)
      }
      updateAppointmentDto.status = undefined;
      return this.appointmentRepository.save({
        ...foundAppointment,
        ...updateAppointmentDto,
      });
    } catch (e) {
      this.appointmentsUtils.returnErrorPatientUpdate(e);
    }
  }

  async remove(id: string) {
    try {
      const contactFound = await this.appointmentRepository.findOneBy({ id });
      if (!contactFound) {
        throw new NotFoundException(USERS_ERRORS.contactNotFound);
      }
      await this.appointmentRepository.softRemove(contactFound);
      return;
    } catch (e) {
      return this.appointmentsUtils.returnErrorPatientUpdate(e);
    }
  }

  async cancelAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentEntity | void> {
    try {
      const foundAppointment: AppointmentEntity | null = await this.appointmentRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!foundAppointment) {
        throw new BadRequestException(USERS_ERRORS.contactNotExists);
      }
      await this.calendarService.updateAvailableCalendar(updateAppointmentDto.calendarId, AVAILABLE_CALENDAR.CANCELED)
      return 
    } catch (e) {
      this.appointmentsUtils.returnErrorPatientUpdate(e);
    }
  }
}
