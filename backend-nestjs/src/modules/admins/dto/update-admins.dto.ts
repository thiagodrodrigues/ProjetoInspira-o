import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class UpdateAdminsDto {
  @ApiProperty({
    description: 'Permissão',
    example: 'Administrador',
  })
  @IsString()
  permission?: string;

  @ApiProperty({
    description: 'Informações do usuário',
    example: 'Fulano de Tal Souza e Silva',
  })
  @ValidateNested()
  users?: CreateUserDto;

}
