export class Finance {}
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CashEntity } from './cash.entity';
import { TYPE_FINCANCES } from 'src/shared/constants/financesType.appointment.enum';

@Entity({ name: 'finances' })
export class FinanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    description: 'Tipo de Finança: Receita ou Despesa',
    enum: TYPE_FINCANCES,
  })
  @Column()
  financeType: string;

  @ApiProperty({
    description: 'Categoria da Finança: Aluguel, Pagamento, Manutenção etc',
    example: 'Aluguel do espaço',
  })
  @Column()
  financeCategory: string;

  @ApiProperty({
    description: 'Descrição da Finança',
  })
  @Column()
  financeDescription: string;

  @ApiProperty({
    description: 'Valor R$',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @ApiProperty({
    description: 'Forma da transação',
    example: 'Dinheiro'
  })
  @Column()
  transaction: string;

  @ApiProperty({
    description: 'Data da transação',
  })
  @Column()
  financeDate: Date;

  @ApiProperty({
    description: 'Status da transação',
    example: 'Paga',
  })
  @Column()
  status: string;

  @ManyToOne(() => CashEntity, (cash) => cash.finances)
  cash: CashEntity;
  
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
