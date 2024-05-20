import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAppointmentDto } from './create-appointment.dto';
import { AVAILABLE_CALENDAR } from 'src/modules/calendar/calendar.enum';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @ApiProperty({
    description: 'Status da consulta',
    enum: AVAILABLE_CALENDAR
  })
  @IsString()
  @IsNotEmpty()
  status: AVAILABLE_CALENDAR;

  @ApiProperty({
    description: 'Atividades realizadas',
    example: 'Fortalecimento da panturrilha',
  })
  @IsString()
  activies?: string;

  @ApiProperty({
    description: 'Observações: Exclusivas do Fisioterapeuta.',
    example: 'Paciente com comportamento difícil',
  })
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Observações: Uso compartilhado',
    example: 'Apresenta evolução no tratamento. Repetir 3x na semana os exercícios.',
  })
  @IsString()
  comments?: string;
}
