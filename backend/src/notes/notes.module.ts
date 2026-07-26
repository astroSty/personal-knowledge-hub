import { Module } from '@nestjs/common';

import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}