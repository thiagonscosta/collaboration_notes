import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesResolver } from './notes.resolver';
import { NotesRepository } from './notes.repository';

@Module({
  providers: [NotesService, NotesResolver, NotesRepository],
})
export class NotesModule {}
