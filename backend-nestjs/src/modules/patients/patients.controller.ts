import { Controller, Get, UseGuards, Headers, UnauthorizedException, InternalServerErrorException, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhysiotherapistsUserGuard } from '../physiotherapists/physiotherapists.guard';
import { PatientsEntity } from './entities/patients.entity';
import * as jwt from 'jsonwebtoken';

@Controller('patients')
@ApiTags('Patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiBearerAuth()
  @UseGuards(PhysiotherapistsUserGuard)
  @ApiOperation({ summary: 'FISIOTERAPEUTA - Listar todos os Pacientes do Fisioterapeuta' })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de todos os pacientes do Fisioterapeuta',
    type: [PatientsEntity],
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
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  async getAllPatients(
    @Headers('Authorization') authorization: string,
    @Query('filter') filter?: string,
    @Query('pageSize') pageSize?: string,
    @Query('pageIndex') pageIndex?: string,
  ): Promise<PatientsEntity[]> {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
    return this.patientsService.getAllPatients({
      filter: filter,
      pageSize: Number(pageSize),
      pageIndex: Number(pageIndex),
    }, decoded);
  }
}
