import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { CalendarsEntity } from './entities/calendar.entity';
import { LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { CalendarsUtils } from './calendar.utils';
import { PhysiotherapistsService } from '../physiotherapists/physiotherapists.service';
import { CALENDARS_ERRORS } from 'src/shared/helpers/errors/calendars-errors.helpers';
import { PhysiotherapistsEntity } from '../physiotherapists/entities/physiotherapists.entity';
import { USERS_ERRORS } from 'src/shared/helpers/errors/users-errors.helpers';
import * as dayjs from 'dayjs';
import { FiltersPaginationDto } from 'src/shared/dto/filters-pagination.dto';
import { AVAILABLE_CALENDAR } from './calendar.enum';

@Injectable()
export class CalendarService {
  constructor(
    @Inject('CALENDARS_REPOSITORY')
    private calendarsRepository: Repository<CalendarsEntity>,
    private calendarsUtil: CalendarsUtils,
    private physiotherapistsService: PhysiotherapistsService,
  ) {}

  async create(decoded: any, createCalendarDto: CreateCalendarDto): Promise<CalendarsEntity[]> {
    try {
      if(typeof decoded == `string`){
        throw new UnauthorizedException(CALENDARS_ERRORS.calendarNotExists)
      }

      const foundUser: PhysiotherapistsEntity = await this.physiotherapistsService.getPhysiotherapist(decoded);

      if (!foundUser) {
        throw new BadRequestException(USERS_ERRORS.userNotExists);
      }
      let calendarsCreate: CalendarsEntity[] = []
      if (foundUser instanceof PhysiotherapistsEntity){
        for(const day of createCalendarDto.days){
          for(const time of createCalendarDto.times){
            const aaaa = `${createCalendarDto.year}-${createCalendarDto.month}-${day}`
            if(dayjs(`${createCalendarDto.year}-${createCalendarDto.month}-${day}`)){
              calendarsCreate.push({
                date: `${createCalendarDto.year}-${createCalendarDto.month}-${day}`,
                time: time,
                available: createCalendarDto.available,
                duration: createCalendarDto.duration,
                physiotherapistId: foundUser.id
              })
            }
          }
        }
      }

      
      const calendar_create = this.calendarsRepository.create(calendarsCreate);
      const calendar_saved = await this.calendarsRepository.save(calendar_create);
      return calendar_saved
      
    } catch (e) {
      this.calendarsUtil.returnErrorCreate(e);
    }
  }

  async findAll(startDate: string, endDate: string, idPhysiotherapist: string): Promise<any> {
    try {
      const calendarsFiltered =
        await this.calendarsRepository.createQueryBuilder()
        .select('*')
        .where(`DATE(date) >= :startDate AND DATE(date) <= :endDate`, {
          startDate,
          endDate,
        })
        .andWhere('physiotherapistId = :idPhysiotherapist', { idPhysiotherapist: idPhysiotherapist })
        .getRawMany();
      return { calendarsFiltered };
    } catch (e) {
      return this.calendarsUtil.returnErrorGetCalendar(e);
    }
  }

  async findOne(idCalendar: string): Promise<CalendarsEntity | void> {
    try {
      const foundCalendar: CalendarsEntity | null = await this.calendarsRepository.findOne({
        where: {
          id: idCalendar,
        },
      });
      if (!foundCalendar) {
        throw new BadRequestException(CALENDARS_ERRORS.calendarNotExists);
      }
      return foundCalendar
    } catch (error) {
      return
    }
  }
  
  async updateAvailableCalendar(calendarId: string, available: AVAILABLE_CALENDAR){
    try {
      const calendarFound = await this.calendarsRepository.findOne({
        where: {
          id: calendarId
        },
      });
      if (!calendarFound) {
        throw new BadRequestException()
      }
      if(available == AVAILABLE_CALENDAR.CANCELED){
        const dateNow = dayjs().format('YYYY-MM-DD');
        if(dayjs(calendarFound.date).format('YYYY-MM-DD') < dateNow){
          throw new BadRequestException()
        }
      }
      return this.calendarsRepository.save({
        ...calendarFound,
        available: available,
      });
    } catch (e) {
      return this.calendarsUtil.returnErrorPatientUpdate(e);
    }
  }

}
