import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({
    description: 'Nome do Contato',
    example: 'José Manoel Silva',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email do Contato',
    example: 'josemsilva@email.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Mensagem enviada pelo Contato',
    example: "Gostaria de saber se aceita o convênio X ou faz atendimento social.",
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
