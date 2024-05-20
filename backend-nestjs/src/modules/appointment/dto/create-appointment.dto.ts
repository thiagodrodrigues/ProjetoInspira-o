import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Id do Paciente',
    example: '1031d3b6-def7-452f-94a6-044d013d3f7e',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({
    description: 'Id do Fisioterapeuta',
    example: '1031d3b6-def7-452f-94a6-044d013d3f7e',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  physiotherapistId: string;

  @ApiProperty({
    description: 'Id do Calendário',
    example: '1031d3b6-def7-452f-94a6-044d013d3f7e',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  calendarId: string;

}
