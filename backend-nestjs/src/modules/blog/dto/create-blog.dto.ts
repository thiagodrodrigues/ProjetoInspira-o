import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({
    description: 'Título do Blog',
    example: 'Novas tecnologias no tratamento fisioterápico.',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @ApiProperty({
    description: 'Título do Blog para URL',
    example: 'Novas tecnologias no tratamento fisioterápico.',
  })
  @IsString()
  titleUrl?: string;

  @ApiProperty({
    description: 'Conteúdo da matéria',
    example: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Autor da matéria',
    example: "Fisioterapeuta Ana Beatriz Castela Dutra",
  })
  @IsString()
  @IsNotEmpty()
  autor: string;

  @ApiProperty({
    description: 'url de Destino da imagem',
    example: "../../images/blog/{{URL}}",
  })
  @IsString()
  url?: string;

  @ApiProperty({
    description: 'Exibir Conteúdo?',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}

