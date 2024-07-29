import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TYPE_OWNER } from 'src/shared/constants/financesType.appointment.enum';

export class CreateCashDto {  
  @ApiProperty({
    description: 'Nome da conta',
    example: 'Principal',
  })
  @IsString()
  @IsNotEmpty()
  wallet: string;

  @ApiProperty({
    description: 'Proprietário da conta',
    example: 'Proprietário | Fisioterapeuta',
  })
  @IsString()
  @IsNotEmpty()
  owner: TYPE_OWNER;

  @ApiProperty({
    description: 'Id do proprietário da conta',
    example: 'Principal',
  })
  @IsString()
  id_owner?: string;

  @ApiProperty({
    description: 'Valor na conta',
    example: 15.00,
  })
  @IsDecimal({ decimal_digits: '2' })
  balance?: number;
}

