import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {

  @ApiProperty({
  example: 'NestJS Notes',
  description: 'Title of the note',
})
@IsString()
@IsNotEmpty()
title!: string;

@ApiProperty({
  example: 'Today I learned about Swagger integration.',
  description: 'Content of the note',
})
@IsString()
@IsNotEmpty()
content!: string;

}