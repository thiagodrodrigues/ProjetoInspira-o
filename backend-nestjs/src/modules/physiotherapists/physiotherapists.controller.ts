import { Controller, Get, InternalServerErrorException, UnauthorizedException, UseGuards, Headers } from '@nestjs/common';
import { PhysiotherapistsService } from './physiotherapists.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PhysiotherapistsUserGuard } from './physiotherapists.guard';
import { PatientsEntity } from '../patients/entities/patients.entity';

@Controller('physiotherapists')
export class PhysiotherapistsController {
  constructor(private readonly physiotherapistsService: PhysiotherapistsService) {}


}
