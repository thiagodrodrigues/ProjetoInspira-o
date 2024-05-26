import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, InternalServerErrorException, UnauthorizedException, Query, ForbiddenException, Put } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OwnerUserGuard } from '../users/owner.guard';
import { ActivityEntity } from './entities/activity.entity';

@Controller('activities')
@ApiTags('Activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Criar nova atividade.' })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Nova matéria criada.',
    type: CreateActivityDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Todos os campos devem ser preenchidos e válidos.',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })  
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'Owner - Listar todas as atividades' })
  @Get('owner')
  @ApiResponse({
    status: 200,
    description: 'Lista todas as atividades',
    type: [ActivityEntity],
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
  async getAllActivitiesOwner(
    @Query('filter') filter?: string,
    @Query('pageSize') pageSize?: string,
    @Query('pageIndex') pageIndex?: string,
  ): Promise<ActivityEntity[]> {
    return this.activitiesService.findAll({
      filter: filter,
      pageSize: Number(pageSize),
      pageIndex: Number(pageIndex),
    });
  }

  @ApiOperation({ summary: 'GERAL - Listar todas as atividaes visíveis' })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista todas as atividades visíveis',
    type: [ActivityEntity],
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  async getAllActivitiesUser(
    @Query('filter') filter?: string,
    @Query('pageSize') pageSize?: string,
    @Query('pageIndex') pageIndex?: string,
  ): Promise<ActivityEntity[]> {
    return this.activitiesService.findAll({
      filter: filter,
      pageSize: Number(pageSize),
      pageIndex: Number(pageIndex),
    }, true);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Listar conteúdo específico para proprietário' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem específica de Contato',
    type: [ActivityEntity],
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
  @Get('owner/:titleUrl')
  findOneOwner(@Param('titleUrl') titleUrl: string) {
    return this.activitiesService.findOne(titleUrl);
  }

  @ApiOperation({ summary: 'GERAL - Listar conteúdo específico visível geral' })
  @ApiResponse({
    status: 200,
    description: 'Listar conteúdo específico visível geral',
    type: [ActivityEntity],
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
  @Get(':titleUrl')
  findOneUser(@Param('titleUrl') titleUrl: string) {
    return this.activitiesService.findOne(titleUrl, true);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Atualizar Atividade' })
  @Put('owner/:titleUrl')
  @ApiResponse({
    status: 201,
    description: 'Atividade atualizada com sucesso.',
    type: UpdateActivityDto,
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
    @Body() updateActivityDto: UpdateActivityDto,
    @Param('titleUrl') titleUrl: string
  ): Promise<ActivityEntity> {
    return this.activitiesService.update(titleUrl, updateActivityDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Excluir uma atividade' })
  @ApiResponse({
    status: 200,
    description: 'Atividade excluída com sucesso.',
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
    return this.activitiesService.remove(id);
  }
}
