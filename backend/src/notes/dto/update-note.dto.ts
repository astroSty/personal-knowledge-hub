import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteDto {

  @ApiProperty({
  example: 'Updated Title',
  description: 'Updated title of the note',
  required: false,
})
@IsOptional()
@IsString()
title?: string;

@ApiProperty({
  example: 'Updated note content.',
  description: 'Updated content of the note',
  required: false,
})
@IsOptional()
@IsString()
content?: string;

}