import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'contact' })
export class ContactEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    description: 'Nome do Contato',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Email do Contato',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'Mensagem do Contato',
  })
  @Column({ type: 'text'})
  message: string;

  @ApiProperty({
    description: 'Mensagem lida?',
    example: false,
  })
  @Column({ default: false })
  read?: boolean;
  
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
