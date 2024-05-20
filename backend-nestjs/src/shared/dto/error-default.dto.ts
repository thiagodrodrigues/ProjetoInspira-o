import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ErroDefaultDto {
  @ApiProperty({
    description: 'message',
    example: 'exemplo de erro',
  })
  @IsEmail()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Error message',
    example: 'Bad Request',
  })
  @IsEmail()
  @IsNotEmpty()
  error: string;

  @ApiProperty({
    description: 'Status code',
    example: '400',
  })
  @IsEmail()
  @IsNotEmpty()
  statusCode: string;
}
