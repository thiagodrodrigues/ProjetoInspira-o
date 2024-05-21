import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, UseGuards, Query, UnauthorizedException, ForbiddenException, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OwnerUserGuard } from '../users/owner.guard';
import { BlogEntity } from './entities/blog.entity';

@Controller('blog')
@ApiTags('Blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Criar nova matéria.' })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Nova matéria criada.',
    type: CreateBlogDto,
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
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'Owner - Listar todas as matérias do Blog' })
  @Get('owner')
  @ApiResponse({
    status: 200,
    description: 'Lista todas as matérias do Blog',
    type: [BlogEntity],
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
  async getAllBlogOwner(
    @Query('filter') filter?: string,
    @Query('pageSize') pageSize?: string,
    @Query('pageIndex') pageIndex?: string,
  ): Promise<BlogEntity[]> {
    return this.blogService.findAll({
      filter: filter,
      pageSize: Number(pageSize),
      pageIndex: Number(pageIndex),
    });
  }

  @ApiOperation({ summary: 'GERAL - Listar todas as matérias Visíveis do Blog' })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista todas as matérias do Blog',
    type: [BlogEntity],
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  async getAllBlogUser(
    @Query('filter') filter?: string,
    @Query('pageSize') pageSize?: string,
    @Query('pageIndex') pageIndex?: string,
  ): Promise<BlogEntity[]> {
    return this.blogService.findAll({
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
    type: [BlogEntity],
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
    return this.blogService.findOne(titleUrl);
  }

  @ApiOperation({ summary: 'GERAL - Listar conteúdo específico visível geral' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem específica de Contato',
    type: [BlogEntity],
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
    return this.blogService.findOne(titleUrl, true);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Atualizar Conteúdo' })
  @Put('owner/:titleUrl')
  @ApiResponse({
    status: 201,
    description: 'Conteúdo atualizado com sucesso.',
    type: UpdateBlogDto,
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
    @Body() updateBlogDto: UpdateBlogDto,
    @Param('titleUrl') titleUrl: string
  ): Promise<BlogEntity> {
    return this.blogService.update(titleUrl, updateBlogDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Excluir um conteúdo' })
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
    return this.blogService.remove(id);
  }
}
