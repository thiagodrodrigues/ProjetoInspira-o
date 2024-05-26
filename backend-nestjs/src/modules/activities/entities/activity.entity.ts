import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'activities' })
export class ActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    description: 'Título da atividade',
  })
  @Column({ unique: true })
  title: string;

  @ApiProperty({
    description: 'Título da atividade para URL',
  })
  @Column({ unique: true })
  titleUrl: string;

  @ApiProperty({
    description: 'Descrição da atividade',
  })
  @Column({type: 'longtext'})
  content: string;

  @ApiProperty({
    description: 'Vídeo da atividade no YouTube',
  })
  @Column()
  url?: string;

  @ApiProperty({
    description: 'Atividade visível para o usuário.',
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
