import { ApiProperty } from '@nestjs/swagger';
import { PhysiotherapistsEntity } from 'src/modules/physiotherapists/entities/physiotherapists.entity';
import { UsersEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'patients' })
export class PatientsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UsersEntity, (users) => users.admin)
  @JoinColumn()
  users: UsersEntity;

  @ApiProperty({
    description: 'Telefone',
    example: '(31) 99292-9292',
  })
  @Column({ nullable: true })
  phone?: string;

  @ApiProperty({
    description: 'Data de Nascimento',
    example: '1992-07-21',
  })
  @Column()
  birth: string;

  @ApiProperty({
    description: 'Sexo',
    enum: ['MASCULINO', 'FEMININO', 'NÃO INFORMADO'],
  })
  @Column({ default: 'NÃO INFORMADO'})
  sex: string;

  @ApiProperty({
    description: 'Profissão',
    example: 'Desenvolvedor Web',
  })
  @Column({ nullable: true })
  profession?: string;

  @ApiProperty({
    description: 'Histórico Médico',
    example: 'Lesão na panturrilha em 2019',
  })
  @Column({ type: 'text', nullable: true })
  medical?: string;

  @ApiProperty({
    description: 'Estilo de Vida',
    example: 'Não fuma, Bebe moderadamente, Sedentário',
  })
  @Column({ type: 'text', nullable: true })
  lifestyle?: string;

  @ApiProperty({
    description: 'Condição Atual',
    example: 'Realizar tratamento na lombar',
  })
  @Column({ type: 'text', })
  condition: string;

  @ApiProperty({
    description: 'Observações',
    example: 'Indicação, Tratamento social',
  })
  @Column({ nullable: true })
  comments?: string | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;

  @ManyToMany(() => PhysiotherapistsEntity, (physiotherapist) => physiotherapist.patients, { nullable: true })
  @JoinTable({
    name: 'patients_physiotherapists',
    joinColumn: {
      name: 'patient_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'physiotherapist_id',
      referencedColumnName: 'id',
    },
  })
  physiotherapists?: PhysiotherapistsEntity[];
}
