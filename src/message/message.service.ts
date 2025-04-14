import { Injectable, NotFoundException } from '@nestjs/common';
import { Messages } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
  ) {}

  private lastId = 1;
  private messages: Messages[] = [
    {
      id: 1,
      text: 'This is a message',
      from: 'Josh',
      to: 'Ane',
      read: false,
      date: new Date(),
    },
  ];

  throwNotFoundError() {
    throw new NotFoundException('Message not found');
  }

  async findAll() {
    return this.messagesRepository.find();
  }

  async findOne(id: number) {
    // const message = this.messages.find((item) => item.id === Number(id));

    const message = await this.messagesRepository.findOne({
      where: {
        id,
      },
    });

    if (message) return message;

    // throw new HttpException('Message not found.', HttpStatus.NOT_FOUND);
    this.throwNotFoundError();
  }

  create(createMessageDto: CreateMessageDto) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...createMessageDto,
      read: false,
      date: new Date(),
    };
    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    const existMessageIndex = this.messages.findIndex(
      (item) => item.id === Number(id),
    );

    if (existMessageIndex < 0) {
      this.throwNotFoundError();
    }

    if (existMessageIndex >= 0) {
      const existMessage = this.messages[existMessageIndex];

      this.messages[existMessageIndex] = {
        ...existMessage,
        ...updateMessageDto,
      };
    }

    return this.messages[existMessageIndex];
  }

  remove(id: number) {
    const existMessageIndex = this.messages.findIndex((item) => item.id === id);

    if (existMessageIndex < 0) {
      this.throwNotFoundError();
    }

    const message = this.messages[existMessageIndex];

    this.messages.splice(existMessageIndex, 1);

    return message;
  }
}
