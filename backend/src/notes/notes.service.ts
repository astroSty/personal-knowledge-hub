import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  createNote(userId: string, createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
        userId,
      },
    });
  }

  getNotes(userId: string) {
    return this.prisma.note.findMany({
      where: {
        userId,
      },
    });
  }

  async updateNote(
  userId: string,
  noteId: string,
  updateNoteDto: UpdateNoteDto,
) {
  const note = await this.prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
  });

  if (!note) {
    throw new NotFoundException('Note not found');
  }

  return this.prisma.note.update({
    where: {
      id: noteId,
    },
    data: updateNoteDto,
  });
}

  async deleteNote(userId: string, noteId: string) {
    const note = await this.prisma.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return this.prisma.note.delete({
      where: {
        id: noteId,
      },
    });
  }
}