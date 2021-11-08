import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesRepository {
  create(json) {
    console.log(json);
  }
}
