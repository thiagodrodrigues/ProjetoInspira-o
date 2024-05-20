import { ApiProperty } from '@nestjs/swagger';
import { CalendarsEntity } from 'src/modules/calendar/entities/calendar.entity';
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

@Entity({ name: 'appointments' })
export class AppointmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @OneToOne(() => CalendarsEntity, (calendar) => calendar.appointment)
  @JoinColumn()
  calendar: CalendarsEntity;

  @ApiProperty({
    description: 'Id do Fisioterapeuta',
  })
  @Column()
  physiotherapistId: string;

  @ApiProperty({
    description: 'Id do Paciente',
  })
  @Column()
  patientId: string;

  @ApiProperty({
    description: 'Atividades realizadas durante a consulta.',
    example: 'Exercícios Regulares de fortalecimento muscular.',
  })
  @Column({ nullable: true})
  activies?: string;

  @ApiProperty({
    description: 'Uso e visualização exclusivo para o Fisioterapeuta - informações sobre tratamento ou paciente.',
    example: 'Paciente com comportamento complicado, não apresenta evolução.',
  })
  @Column({ nullable: true})
  notes?: string;

  @ApiProperty({
    description: 'Observações para o paciente. Pedidos para a próxima prática. Exercícios a serem realizados.',
    example: 'Prática realizada com sucesso. Repetir exercícios 30 min por dia.',
  })
  @Column({ nullable: true})
  comments?: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;

}
