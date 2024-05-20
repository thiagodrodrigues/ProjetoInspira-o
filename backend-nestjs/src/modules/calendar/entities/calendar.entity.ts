import { ApiProperty } from '@nestjs/swagger';
import { PhysiotherapistsEntity } from 'src/modules/physiotherapists/entities/physiotherapists.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AVAILABLE_CALENDAR } from '../calendar.enum';
import { Type } from '@nestjs/common';
import { AppointmentEntity } from 'src/modules/appointment/entities/appointment.entity';

@Entity({ name: 'calendars' })
export class CalendarsEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    description: 'Id do Fisioterapeuta',
  })
  @Column()
  physiotherapistId: string;

  @ApiProperty({
    description: 'Data',
    example: '2024-12-25',
  })
  @Column()
  date: string;

  @ApiProperty({
    description: 'Hora',
    example: '15:00',
  })
  @Column()
  time: string;

  @ApiProperty({
    description: 'Status do horário na agenda do Fisioterapeuta.',
    enum: AVAILABLE_CALENDAR,
  })
  @Column({ default: 'LIVRE'})
  available: string;

  @ApiProperty({
    description: 'Tempo, em minutos, reservado a cada horário inserido.',
    example: '60',
  })
  @Column({ default: '60' })
  duration: string;

  @OneToOne(() => AppointmentEntity, (appointment) => appointment.calendar, { nullable: true })
  @JoinColumn()
  appointment?: AppointmentEntity;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;

}
