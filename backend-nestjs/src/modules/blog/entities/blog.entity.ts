import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'blog' })
export class BlogEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    description: 'Título da matéria',
  })
  @Column({ unique: true })
  title: string;

  @ApiProperty({
    description: 'Título da matéria para URL',
  })
  @Column({ unique: true })
  titleUrl: string;

  @ApiProperty({
    description: 'Conteúdo da matéria',
  })
  @Column({type: 'longtext'})
  content: string;

  @ApiProperty({
    description: 'Autor da Matéria',
  })
  @Column()
  autor: string;

  @ApiProperty({
    description: 'Mídia da matéria',
  })
  @Column()
  url?: string;

  @ApiProperty({
    description: 'Matéria visível para o usuário.',
  })
  @Column({ default: true })
  status: boolean;
  
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
