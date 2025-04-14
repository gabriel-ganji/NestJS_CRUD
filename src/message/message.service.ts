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

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = {
      ...createMessageDto,
      read: false,
      date: new Date(),
    };

    const message = this.messagesRepository.create(newMessage);

    return this.messagesRepository.save(message);
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const partialUpdateDto = {
      read: updateMessageDto?.read,
      text: updateMessageDto?.text,
    };
    const message = await this.messagesRepository.preload({
      id,
      ...partialUpdateDto,
    });

    if (!message) return this.throwNotFoundError();

    await this.messagesRepository.save(message);

    return message;
  }

  async remove(id: number) {
    const message = await this.messagesRepository.findOneBy({ id });

    if (!message) return this.throwNotFoundError();

    return this.messagesRepository.remove(message);
  }
}
