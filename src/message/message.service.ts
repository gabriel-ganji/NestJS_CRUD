import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  hello(): string {
    return 'Hello World!';
  }
}
