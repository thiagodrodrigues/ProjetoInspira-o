import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, UnauthorizedException, UseGuards, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Headers } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersGuard } from './users.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminsUserGuard } from '../admins/admins.guard';
import { OwnerUserGuard } from './owner.guard';
import { ListPhysiotherapistsDto } from './dto/get-physiotherapists.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}
  
  @ApiBearerAuth()
  @UseGuards(AdminsUserGuard)
  @ApiOperation({ summary: 'ADMIN - Permissão para Fisioterapeuta' })
  @Put('admToPhysiotherapist/:idUser')
  @ApiResponse({
    status: 201,
    description: 'Conteúdo atualizado com sucesso.',
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
  @ApiQuery({ name: 'permission', required: true, type: String })
  async updatePhysiotherapistForAdmin(
    @Param('idUser') idUser: string,
    @Query('permission') permission: string
  ) {
    return this.usersService.updatePhysiotherapist(idUser, permission);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Permissão para Fisioterapeuta' })
  @Put('ownerToPhysiotherapist/:idUser')
  @ApiResponse({
    status: 201,
    description: 'Conteúdo atualizado com sucesso.',
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
  @ApiQuery({ name: 'permission', required: true, type: String })
  async updatePhysiotherapist(
    @Param('idUser') idUser: string,
    @Query('permission') permission: string
  ) {
    return this.usersService.updatePhysiotherapist(idUser, permission);
  }

  @ApiBearerAuth()
  @UseGuards(AdminsUserGuard)
  @ApiOperation({ summary: 'ADMIN - Permissão para Proprietário' })
  @Put('admToOwner/:idUser')
  @ApiResponse({
    status: 201,
    description: 'Conteúdo atualizado com sucesso.',
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
  @ApiQuery({ name: 'owner', required: true, type: String })
  async updateOwnerForAdmin(
    @Param('idUser') idUser: string,
    @Query('owner') owner: string
  ) {
    return this.usersService.updateOwner(idUser, owner);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Permissão para Proprietário' })
  @Put('ownerToOwner/:idUser')
  @ApiResponse({
    status: 201,
    description: 'Conteúdo atualizado com sucesso.',
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
  @ApiQuery({ name: 'owner', required: true, type: String })
  async updateOwner(
    @Param('idUser') idUser: string,
    @Query('owner') owner: string
  ) {
    return this.usersService.updateOwner(idUser, owner);
  }

  @ApiBearerAuth()
  @UseGuards(AdminsUserGuard)
  @ApiOperation({ summary: 'ADMIN - Permissão para Admin' })
  @Put('admToAdm/:idUser')
  @ApiResponse({
    status: 201,
    description: 'Conteúdo atualizado com sucesso.',
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
  @ApiQuery({ name: 'permission', required: true, type: String })
  async updateAdmin(
    @Param('idUser') idUser: string,
    @Query('permission') permission: string
  ) {
    return this.usersService.updatePermissionAdmin(idUser, permission);
  }

  @ApiOperation({ summary: 'Realizar o Login' })
  @Post('signIn')
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido ',
    type: LoginUserDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: UnauthorizedException,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não existe',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 500,
    description: 'Aconteceu um Imprevisto',
    type: InternalServerErrorException,
  })
  async signIn(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ token: string | undefined, user: UsersEntity, permission: string }> {
    return this.usersService.signIn(loginUserDto);
  }

  @ApiOperation({ summary: 'Cadastrar novo usuário' })
  @Post('new')
  @ApiResponse({
    status: 201,
    description: 'Usuário Cadastrado com Sucesso',
    type: CreateUserDto,
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
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UsersEntity> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @ApiOperation({ summary: 'Perfil do Usuário Logado' })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário',
    type: CreateUserDto,
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
  async userProfile(
    @Headers('Authorization') authorization: string,
  ): Promise<UsersEntity> {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
    return this.usersService.userProfile(decoded);
  }

  @ApiBearerAuth()
  @UseGuards(AdminsUserGuard)
  @ApiOperation({ summary: 'ADMIN - Listar todos os usuários para administrador' })
  @Get('admin')
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário',
    type: CreateUserDto,
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
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  async getAllUsersAdmin(
    @Headers('Authorization') authorization: string,
    @Query('filter') filter?: string,
    @Query('pageSize') pageSize?: string,
    @Query('pageIndex') pageIndex?: string,
  ) {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
    return this.usersService.getAll({
      filter: filter,
      pageSize: Number(pageSize),
      pageIndex: Number(pageIndex),
    }, decoded);
  }

  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @ApiOperation({ summary: 'ADMIN - Listar nome de todos os fisioterapeutas para novas consultas' })
  @Get('physiotherapists')
  @ApiResponse({
    status: 200,
    description: 'Lista de Fisioterapeutas',
    type: ListPhysiotherapistsDto,
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
  async getAllPhysiotherapists(
  ) {
    return this.usersService.getPhysiotherapists();
  }

  @ApiBearerAuth()
  @UseGuards(OwnerUserGuard)
  @ApiOperation({ summary: 'OWNER - Listar todos os usuários para proprietário' })
  @Get('owner')
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário',
    type: CreateUserDto,
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
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  async getAllUsersOwner(
    @Headers('Authorization') authorization: string,
    @Query('filter') filter?: string,
    @Query('pageSize') pageSize?: string,
    @Query('pageIndex') pageIndex?: string,
  ): Promise<UsersEntity> {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
    return this.usersService.getAll({
      filter: filter,
      pageSize: Number(pageSize),
      pageIndex: Number(pageIndex),
    }, decoded);
  }

  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @ApiOperation({ summary: 'Atualizar Usuário' })
  @Put()
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário',
    type: CreateUserDto,
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
  async updatePatientProfile(
    @Headers('Authorization') authorization: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UsersEntity> {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
    return this.usersService.updateProfile(decoded, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @ApiOperation({ summary: 'Excluir um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário excluído com sucesso.',
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
  @Delete()
  async adminDeleteProduct(@Headers('Authorization') authorization: string,) {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
    return await this.usersService.deleteUser(decoded);
  }
}
