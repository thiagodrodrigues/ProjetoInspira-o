import { ApiProperty } from '@nestjs/swagger';
import { AdminsEntity } from 'src/modules/admins/entities/admin.entity';
import { PatientsEntity } from 'src/modules/patients/entities/patients.entity';
import { PhysiotherapistsEntity } from 'src/modules/physiotherapists/entities/physiotherapists.entity';
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

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nome',
    example: 'Fulano de Tal Souza e Silva',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'E-mail',
    example: 'fulanodetalss@email.com',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'Senha',
    example: '123deOliveira4#',
  })
  @Column({ type: 'text' })
  password: string;

  @ApiProperty({
    description: 'Tipo de usuário',
    enum: ['Usuário', 'Fisioterapeuta ', 'Administrador'],
  })
  @Column({ default: 'Usuário' })
  user_type?: string;

  @ApiProperty({
    description: 'Proprietário',
    example: false,
  })
  @Column({ default: false })
  owner?: boolean;

  @OneToOne(() => AdminsEntity, (admin) => admin.users, {
    eager: true,
    nullable: true
  })
  @JoinColumn()
  admin?: AdminsEntity | null;

  @OneToOne(() => PatientsEntity, (patients) => patients.users, {
    eager: true,
    nullable: true
  })
  @JoinColumn()
  patient?: PatientsEntity | null;

  @OneToOne(() => PhysiotherapistsEntity, (physiotherapists) => physiotherapists.users, {
    eager: true,
    nullable: true
  })
  @JoinColumn()
  physiotherapist?: PhysiotherapistsEntity | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
