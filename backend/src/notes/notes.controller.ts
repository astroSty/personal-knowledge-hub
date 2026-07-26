import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createNote(
    @Req() req: Request,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.notesService.createNote(
      (req.user as any).sub,
      createNoteDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getNotes(
    @Req() req: Request,
  ) {
    return this.notesService.getNotes(
      (req.user as any).sub,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateNote(
    @Req() req: Request,
    @Param('id') noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.updateNote(
  (req.user as any).sub,
  noteId,
  updateNoteDto,
);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteNote(
    @Req() req: Request,
    @Param('id') noteId: string,
  ) {
    return this.notesService.deleteNote(
      (req.user as any).sub,
      noteId,
    );
  }
}