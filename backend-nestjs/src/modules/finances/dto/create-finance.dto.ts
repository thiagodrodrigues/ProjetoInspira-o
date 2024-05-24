import { IsBoolean, IsDate, IsDecimal, IsEmail, IsEnum, IsInstance, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CashEntity } from '../entities/cash.entity';
import { TYPE_FINCANCES } from 'src/shared/constants/financesType.appointment.enum';

export class CreateFinanceDto {
  @ApiProperty({
    description: 'Receita ou Despesa',
    enum: TYPE_FINCANCES,
  })
  @IsEnum(TYPE_FINCANCES)
  @IsNotEmpty()
  financeType: string;
  
  @ApiProperty({
    description: 'Categoria da transação de acordo com o tipo',
    example: 'Aluguel do espaço',
  })
  @IsString()
  @IsNotEmpty()
  financeCategory: string;
  
  @ApiProperty({
    description: 'Novo valor para: Categoria da transação de acordo com o tipo',
    example: 'Aluguel do espaço',
  })
  @IsString()
  financeCategoryValue?: string;

  @ApiProperty({
    description: 'Descrição da transação',
    example: 'Compra de material de escritório na Leroy Merlin',
  })
  @IsString()
  @IsNotEmpty()
  financeDescription: string;

  @ApiProperty({
    description: 'Valor R$',
  })
  @IsDecimal({ decimal_digits: '2' }, { message: 'O valor deve ser um número decimal com até 2 casas decimais' })
  @IsPositive({ message: 'O valor deve ser positivo' })
  value: number;

  @ApiProperty({
    description: 'Forma da transação',
    example: 'Dinheiro'
  })
  @IsString()
  @IsNotEmpty()
  transaction: string;

  @ApiProperty({
    description: 'Forma da transação: outra',
    example: 'Novo valor de transação'
  })
  @IsString()
  transactionValue?: string;

  @ApiProperty({
    description: 'Data da transação',
  })
  @IsDate({ message: 'A data da transação deve ser uma data válida' })
  financeDate: Date;

  @ApiProperty({
    description: 'Status da transação',
    example: 'Paga',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Novo: Status da transação',
    example: 'Paga',
  })
  @IsString()
  statusValue?: string;

  @ApiProperty({
    description: 'Instância de CashEntity',
  })
  @IsInstance(CashEntity, { message: 'A instância deve ser um objeto do tipo CashEntity' })
  cash: CashEntity;
}

