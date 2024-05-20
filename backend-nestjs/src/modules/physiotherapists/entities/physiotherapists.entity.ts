import { ApiProperty } from '@nestjs/swagger';
import { CalendarsEntity } from 'src/modules/calendar/entities/calendar.entity';
import { PatientsEntity } from 'src/modules/patients/entities/patients.entity';
import { UsersEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'physiotherapists' })
export class PhysiotherapistsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'CREFITO',
    example: 'CREFITO-4/010101F',
  })
  @Column()
  crefito: string;

  @OneToOne(() => UsersEntity, (users) => users.admin)
  @JoinColumn()
  users: UsersEntity;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;

  @ManyToMany(() => PatientsEntity, (patient) => patient.physiotherapists, { nullable: true })
  @JoinTable({
    name: 'patients_physiotherapists',
    joinColumn: {
      name: 'physiotherapist_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'patient_id',
      referencedColumnName: 'id',
    },
  })
  patients?: PatientsEntity[];

}
