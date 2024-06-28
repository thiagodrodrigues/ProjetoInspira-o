import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListPhysiotherapistsDto {
  @ApiProperty({
    description: 'id',
    example: 'fsd1f5afa54a56sdfaqghh5668',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Nome',
    example: 'Fulano de Tal Souza e Silva',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Crefito',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  crefito: string;

}
