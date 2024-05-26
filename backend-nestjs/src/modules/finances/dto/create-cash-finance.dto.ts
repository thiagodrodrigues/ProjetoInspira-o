import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCashDto {  
  @ApiProperty({
    description: 'Nome da conta',
    example: 'Principal',
  })
  @IsString()
  @IsNotEmpty()
  wallet: string;

  @ApiProperty({
    description: 'Valor na conta',
    example: 15.00,
  })
  @IsDecimal({ decimal_digits: '2' })
  balance?: number;
}

