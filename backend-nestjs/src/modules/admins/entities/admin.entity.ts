import { ApiProperty } from '@nestjs/swagger';
import { UsersEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'admins' })
export class AdminsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Permissão',
    example: 'Administrador',
  })
  @Column({ default: 'Admin' })
  permission: string;

  @OneToOne(() => UsersEntity, (users) => users.admin)
  @JoinColumn()
  users: UsersEntity;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
