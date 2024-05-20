import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class UpdatePatientDto {
  @ApiProperty({
    description: 'Telefone',
    example: '(31) 99292-9292',
  })
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Data de Nascimento',
    example: '1992-07-21',
  })
  @IsString()
  birth?: string;

  @ApiProperty({
    description: 'Sexo',
    enum: ['MASCULINO', 'FEMININO', 'NÃO INFORMADO'],
  })
  @IsString()
  sex?: string;

  @ApiProperty({
    description: 'Profissão',
    example: 'Desenvolvedor Web',
  })
  @IsString()
  profession?: string;

  @ApiProperty({
    description: 'Histórico Médico',
    example: 'Lesão na panturrilha em 2019',
  })
  @IsString()
  medical?: string;

  @ApiProperty({
    description: 'Estilo de Vida',
    example: 'Não fuma, Bebe moderadamente, Sedentário',
  })
  @IsString()
  lifestyle?: string;

  @ApiProperty({
    description: 'Condição Atual',
    example: 'Realizar tratamento na lombar',
  })
  @IsString()
  condition?: string;

  @ApiProperty({
    description: 'Observações',
    example: 'Indicação, Tratamento social',
  })
  @IsString()
  comments?: string;

  @ApiProperty({
    description: 'Informações do usuário',
    example: 'Fulano de Tal Souza e Silva',
  })
  @ValidateNested()
  users?: CreateUserDto;

}
