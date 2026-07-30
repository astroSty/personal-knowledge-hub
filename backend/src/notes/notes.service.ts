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

  getNotes(
  userId: string,
  search?: string,
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
) {
  const skip = (page - 1) * limit;

  return this.prisma.note.findMany({
    where: {
      userId,
      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),
    },
    skip,
    take: limit,

    orderBy: {
  [sortBy]: order,
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