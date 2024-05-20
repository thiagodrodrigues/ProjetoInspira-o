import { Controller, Get, Headers, Post, Body, Patch, Param, Delete, UnauthorizedException, BadRequestException, InternalServerErrorException, UseGuards, Query } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CalendarsEntity } from './entities/calendar.entity';
import { PhysiotherapistsUserGuard } from '../physiotherapists/physiotherapists.guard';
import * as jwt from 'jsonwebtoken';
import { UsersGuard } from '../users/users.guard';

@Controller('calendars')
@ApiTags('Calendars')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @ApiBearerAuth()
  @UseGuards(PhysiotherapistsUserGuard)
  @ApiOperation({ summary: 'FISIOTERAPEUTA | Cadastrar novo horário na agenda' })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Horário Cadastrado com Sucesso',
    type: CreateCalendarDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: UnauthorizedException,
  })
  @ApiResponse({
    status: 404,
    description: 'Horário já existe',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })
  async create(
    @Headers('Authorization') authorization: string,
    @Body() createCalendarDto: CreateCalendarDto,
  ): Promise<CalendarsEntity[]> {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
    return this.calendarService.create(decoded, createCalendarDto);
  }

  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @ApiOperation({ summary: 'FISIOTERAPEUTA | PACIENTE - Listar todas as datas do Fisioterapeuta' })
  @Get('/:idPhysiotherapist')
  @ApiResponse({
    status: 200,
    description: 'Lista todas as datas do Fisioterapeuta',
    type: [CalendarsEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: UnauthorizedException,
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })
  @ApiQuery({ name: 'startDate', required: true, type: String })
  @ApiQuery({ name: 'endDate', required: true, type: String })
  async getAllPatients(
    @Param('idPhysiotherapist') idPhysiotherapist: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<CalendarsEntity[]> {
    return this.calendarService.findAll(startDate, endDate, idPhysiotherapist);
  }

}
