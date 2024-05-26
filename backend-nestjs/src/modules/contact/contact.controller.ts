import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, UnauthorizedException, UseGuards, Headers, Query, ForbiddenException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactEntity } from './entities/contact.entity';
import { OwnerUserGuard } from '../users/owner.guard';

@Controller('contact')
@ApiTags('Contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'GERAL - Entrar em contato.' })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Nova mensagem enviada.',
    type: CreateContactDto,
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
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Listar todas as mensagens de Contato' })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista todas as mensagens de Contato',
    type: [ContactEntity],
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
  @ApiQuery({ name: 'read', required: false, type: Boolean })
  async getAllContacts(
    @Query('filter') filter?: string,
    @Query('pageSize') pageSize?: string,
    @Query('pageIndex') pageIndex?: string,
    @Query('read') read?: string,
  ): Promise<ContactEntity[]> {
    return this.contactService.findAll({
      filter: filter,
      pageSize: Number(pageSize),
      pageIndex: Number(pageIndex),
    }, read);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Listar mensagem específica de Contato' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem específica de Contato',
    type: [ContactEntity],
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
  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.contactService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Excluir uma mensagem de contato.' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem excluída com sucesso.',
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
    return this.contactService.remove(id);
  }
}
