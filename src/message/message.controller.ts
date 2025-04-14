import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //Route to find all messages
  @HttpCode(201)
  @Get()
  findAll() {
    const messages = this.messageService.findAll();
    return messages;
  }

  //Route to find one message
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: any) {
    return this.messageService.findOne(id);
  }

  //Route to create/insert data in dbS
  @Post()
  create(@Body() createBodyDto: CreateMessageDto) {
    return this.messageService.create(createBodyDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() UpdateMessageDto: any) {
    return this.messageService.update(id, UpdateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.remove(id);
  }
}
