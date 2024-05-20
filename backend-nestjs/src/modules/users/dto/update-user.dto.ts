import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdatePatientDto } from 'src/modules/patients/dto/update-patients.dto';
import { UpdatePhysiotherapistsDto } from 'src/modules/physiotherapists/dto/update-physiotherapists.dto';
import { UpdateAdminsDto } from 'src/modules/admins/dto/update-admins.dto';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome',
    example: 'Fulano de Tal Souza e Silva',
  })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: 'Email',
    example: 'exemplo@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({
    description: 'Password',
    example: '123deOliveira4#',
  })
  @IsNotEmpty()
  @MinLength(10)
  password?: string;

  @ApiProperty({
    description: 'Informações do Administrador',
    type: UpdateAdminsDto,
  })
  @ValidateNested()
  @IsNotEmpty()
  admin?: UpdateAdminsDto;

  @ApiProperty({
    description: 'Informações do Paciente',
    type: UpdatePatientDto,
  })
  @ValidateNested()
  @IsNotEmpty()
  patient?: UpdatePatientDto;

  @ApiProperty({
    description: 'Informações do Fisioterapeuta',
    type: UpdatePhysiotherapistsDto,
  })
  @ValidateNested()
  @IsNotEmpty()
  physiotherapist?: UpdatePhysiotherapistsDto;

}
