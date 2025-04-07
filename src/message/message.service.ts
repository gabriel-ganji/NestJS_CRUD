import { Injectable } from '@nestjs/common';
import { Messages } from './entities/message.entity';

@Injectable()
export class MessageService {
  private lastId = 1;
  private messages: Messages[] = [
    {
      id: 1,
      texto: 'This is a message',
      from: 'Josh',
      to: 'Ane',
      read: false,
      date: new Date(),
    },
  ];

  findAll(): Messages[] {
    return this.messages;
  }

  findOne(id: string) {
    return this.messages.find((item) => item.id === Number(id));
  }

  create(body: any) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...body,
    };
    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: string, body: any) {
    const existMessageIndex = this.messages.findIndex(
      (item) => item.id === Number(id),
    );

    if (existMessageIndex >= 0) {
      const existMessage = this.messages[existMessageIndex];

      this.messages[existMessageIndex] = {
        ...existMessage,
        ...body,
      };
    }

    return this.messages[existMessageIndex];
  }

  remove(id: string) {
    const existMessageIndex = this.messages.findIndex(
      (item) => item.id === Number(id),
    );

    if (existMessageIndex >= 0) {
      this.messages.splice(existMessageIndex, 1);
    }
    return `Message with id: ${id} successfully deleted`;
  }
}
