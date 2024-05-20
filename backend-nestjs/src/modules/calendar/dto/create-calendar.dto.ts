import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AVAILABLE_CALENDAR } from '../calendar.enum';

export class CreateCalendarDto {
  @ApiProperty({
    description: 'Ano ao qual será inserido a data',
    example: '2024',
  })
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiProperty({
    description: 'Mês ao qual será inserido a data',
    example: '01',
  })
  @IsString()
  @IsNotEmpty()
  month: string;

  @ApiProperty({
    description: 'Dias do mês ao quais serão inseridas datas',
    example: ['01', '02', '03', '06', '07'],
  })
  @IsArray()
  @IsNotEmpty()
  days: [string];

  @ApiProperty({
    description: 'Horários do dia ao quais serão inseridas datas',
    example: ['10:00', '11:00', '13:00', '14:00', '15:00'],
  })
  @IsArray()
  @IsNotEmpty()
  times: [string];

  @ApiProperty({
    description: 'Tipo de disponibilidade dos horários selecionados',
    example: 'LIVRE',
  })
  @IsEnum(AVAILABLE_CALENDAR)
  @IsNotEmpty()
  available: string;

  @ApiProperty({
    description: 'Tempo, em minutos, reservado a cada horário inserido.',
    example: '60',
  })
  @IsString()
  @IsNotEmpty()
  duration: string;

}
