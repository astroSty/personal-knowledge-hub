import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('NotesService', () => {
  let service: NotesService;

  it('should throw NotFoundException when updating a note that does not belong to the user', async () => {
   mockPrismaService.note.findFirst.mockResolvedValue(null);

   await expect(
    service.updateNote('user-1', 'note-1', { title: 'Updated' }),
   ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when deleting a note that does not belong to the user', async () => {
   mockPrismaService.note.findFirst.mockResolvedValue(null);

   await expect(
    service.deleteNote('user-1', 'note-1'),
   ).rejects.toThrow(NotFoundException);
  });

  const mockPrismaService = {
    note: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});