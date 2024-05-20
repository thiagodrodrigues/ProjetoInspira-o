import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, UnauthorizedException, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Headers } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersGuard } from './users.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

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
