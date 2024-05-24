import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FinanceEntity } from './finance.entity';

@Entity({ name: 'cash' })
export class CashEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    description: 'Conta',
  })
  @Column()
  wallet: string;

  @ApiProperty({
    description: 'Saldo',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balance: number;

  @OneToMany(() => FinanceEntity, (finance) => finance.cash)
  finances: FinanceEntity[];
  
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
