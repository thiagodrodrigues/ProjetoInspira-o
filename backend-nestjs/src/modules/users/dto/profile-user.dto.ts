import { IsArray, IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminsEntity } from 'src/modules/admins/entities/admin.entity';
import { PatientsEntity } from 'src/modules/patients/entities/patients.entity';
import { PhysiotherapistsEntity } from 'src/modules/physiotherapists/entities/physiotherapists.entity';
import { TYPE_USER } from '../users.enum';

export class ProfileUserDto {
  @ApiProperty({
    description: 'id',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Nome',
    example: 'Fulano de Tal Souza e Silva',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email',
    example: 'exemplo@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Tipo de Usuário',
    example: 'Usuário',
  })
  @IsString()
  @IsNotEmpty()
  user_type?: TYPE_USER;

  @ApiProperty({
    description: 'Informações de Administrador',
    type: AdminsEntity,
  })
  admin?: AdminsEntity | null;

  @ApiProperty({
    description: 'Informações de Paciente',
    type: AdminsEntity,
  })
  patient?: PatientsEntity | null;

  @ApiProperty({
    description: 'Informações de Fisioterapeuta',
    type: AdminsEntity,
  })
  physiotherapist?: PhysiotherapistsEntity | null;

}
