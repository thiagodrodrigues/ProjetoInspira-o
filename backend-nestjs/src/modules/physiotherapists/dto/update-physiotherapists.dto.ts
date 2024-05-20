import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class UpdatePhysiotherapistsDto {
  @ApiProperty({
    description: 'CREFITO',
    example: 'CREFITO-4/010101F',
  })
  @IsString()
  crefito?: string;

  @ApiProperty({
    description: 'Informações do usuário',
    example: 'Fulano de Tal Souza e Silva',
  })
  @ValidateNested()
  users?: CreateUserDto;

}
