import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, InternalServerErrorException, UnauthorizedException, Query, ForbiddenException, Put } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OwnerUserGuard } from '../users/owner.guard';
import { FinanceEntity } from './entities/finance.entity';
import { VariableFieldEntity } from './entities/variableField.entity';
import { CreateCashDto } from './dto/create-cash-finance.dto';

@Controller('finances')
@ApiTags('Finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Criar nova transação.' })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Nova transação criada.',
    type: CreateFinanceDto,
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
  create(@Body() createFinanceDto: CreateFinanceDto) {
    return this.financesService.create(createFinanceDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Criar nova conta.' })
  @Post('cash')
  @ApiResponse({
    status: 201,
    description: 'Nova conta criada.',
    type: CreateFinanceDto,
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
  createCash(@Body() createCashDto: CreateCashDto) {
    return this.financesService.createCash(createCashDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'Owner - Listar todas as atividades financeiras' })
  @Get('owner')
  @ApiResponse({
    status: 200,
    description: 'Lista todas as atividades financeiras',
    type: [FinanceEntity],
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
  @ApiQuery({ name: 'idCash', required: true, type: String })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  async getAllFinancesOwner(
    @Param('idCash') idCash: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('filter') filter?: string,
    @Query('pageSize') pageSize?: string,
    @Query('pageIndex') pageIndex?: string,
  ): Promise<FinanceEntity[]> {
    return this.financesService.findAll({
      startDate: startDate,
      endDate: endDate,
      filter: filter,
      pageSize: Number(pageSize),
      pageIndex: Number(pageIndex),
    }, idCash);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Listar atividade financeira específica' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem específica de Contato',
    type: [FinanceEntity],
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
  @Get('owner/:id')
  findOneFinance(@Param('id') id: string) {
    return this.financesService.findOneFinance(id);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Lista variáveis de campo' })
  @ApiResponse({
    status: 200,
    description: 'Lista de variáveis de campo',
    type: [VariableFieldEntity],
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
  @Get('fields')
  @ApiQuery({ name: 'field', required: true, type: String })
  findAllFields(
    @Query('field') field: string
  ): Promise<VariableFieldEntity[]>  {
    return this.financesService.findAllFields(field);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Atualizar Transação' })
  @Put('owner/:id')
  @ApiResponse({
    status: 201,
    description: 'Transação atualizada com sucesso.',
    type: UpdateFinanceDto,
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
    @Body() updateFinanceDto: UpdateFinanceDto,
    @Param('id') id: string
  ) {
    return this.financesService.update(id, updateFinanceDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Excluir uma transação' })
  @ApiResponse({
    status: 200,
    description: 'Transação excluída com sucesso.',
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
    return this.financesService.remove(id);
  }
}
