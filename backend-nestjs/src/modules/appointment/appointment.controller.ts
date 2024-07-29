import { Controller, Headers, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, BadRequestException, InternalServerErrorException, Query, ForbiddenException, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientsUserGuard } from '../patients/patients.guard';
import { AppointmentEntity } from './entities/appointment.entity';
import { STATUS_APPOINTMENTS } from 'src/shared/constants/status.appointment.enum';
import * as jwt from 'jsonwebtoken';
import { UsersGuard } from '../users/users.guard';
import { PhysiotherapistsUserGuard } from '../physiotherapists/physiotherapists.guard';
import { AVAILABLE_CALENDAR } from '../calendar/calendar.enum';

@Controller('appointment')
@ApiTags('Appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @ApiOperation({ summary: 'FISIOTERAPEUTAS | PACIENTES - Cadastrar nova consulta.' })
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Novo agendamento realizado com sucesso.',
    type: CreateAppointmentDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: UnauthorizedException,
  })
  @ApiResponse({
    status: 404,
    description: 'Paciente não existe',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 404,
    description: 'Fisioterapeuta não existe',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })  
  async create(
    @Headers('Authorization') authorization: string,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
    return this.appointmentService.create(decoded, createAppointmentDto);
  }

  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @ApiOperation({ summary: 'PACIENTE | FISIOTERAPEUTA - Cancelar Consulta' })
  @Delete('cancel/:id')
  @ApiResponse({
    status: 201,
    description: 'Consulta cancelada com sucesso.',
    type: UpdateAppointmentDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: UnauthorizedException,
  })
  @ApiResponse({
    status: 404,
    description: 'Dados de consulta inválidos.',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })
  async cancelAppointment(
    @Param('id') id: string
  ): Promise<AppointmentEntity> {
    const status = {status: AVAILABLE_CALENDAR.CANCELED}
    return this.appointmentService.update(id, status);
  }

  @ApiBearerAuth()
  @UseGuards(PatientsUserGuard)
  @ApiOperation({ summary: 'PACIENTES - Listar consultas do paciente logado.' })
  @Get('patient')
  @ApiResponse({
    status: 200,
    description: 'Lista de consultas do paciente.',
    type: AppointmentEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: UnauthorizedException,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário já existe',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })
  @ApiQuery({ name: 'status', required: true, enum: STATUS_APPOINTMENTS })
  async findAllAppointmentByPatient(
    @Headers('Authorization') authorization: string,
    @Query('status') status: STATUS_APPOINTMENTS,
  ): Promise<AppointmentEntity[] | void> {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
    return this.appointmentService.findAllAppointmentByPatient(decoded, status);
  }

  @ApiBearerAuth()
  @UseGuards(PhysiotherapistsUserGuard)
  @ApiOperation({ summary: 'FISIOTERAPEUTA - Listar agendamentos do fisioterapeuta logado' })
  @Get('physioterapist')
  @ApiResponse({
    status: 200,
    description: 'Lista de consultas do paciente.',
    type: AppointmentEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: UnauthorizedException,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário já existe',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })
  @ApiQuery({ name: 'status', required: true, enum: STATUS_APPOINTMENTS })
  async findAllAppointmentByPhysioterapist(
    @Headers('Authorization') authorization: string,
    @Query('status') status: STATUS_APPOINTMENTS,
  ): Promise<AppointmentEntity[] | void> {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
    return this.appointmentService.findAllAppointmentByPhysioterapist(decoded, status);
  }

  @ApiBearerAuth()
  @UseGuards(PhysiotherapistsUserGuard)
  @ApiOperation({ summary: 'FISIOTERAPEUTA - Listar consultas específicas de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem específica de Contato',
    type: [AppointmentEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: UnauthorizedException,
  })
  @ApiResponse({
    status: 403,
    description: 'Recurso indisponível para usuário.',
    type: ForbiddenException,
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })
  @Get('physiotherapist/:id')
  findOne(
    @Param('id do Paciente') id: string
  ) {
    return this.appointmentService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(PhysiotherapistsUserGuard)
  @ApiOperation({ summary: 'FISIOTERAPEUTA - Atualizar Consulta' })
  @Put(':id')
  @ApiResponse({
    status: 201,
    description: 'Consulta atualizada com sucesso.',
    type: UpdateAppointmentDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: UnauthorizedException,
  })
  @ApiResponse({
    status: 404,
    description: 'Dados de consulta inválidos.',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })
  async update(
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Param('id') id: string
  ): Promise<AppointmentEntity> {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @ApiBearerAuth()
  @UseGuards(PhysiotherapistsUserGuard)
  @ApiOperation({ summary: 'FISIOTERAPEUTA - Excluir uma consulta.' })
  @ApiResponse({
    status: 200,
    description: 'Consulta excluída com sucesso.',
  })
  @ApiResponse({
    status: 403,
    description: 'Credenciais inválidas',
    type: ForbiddenException,
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
