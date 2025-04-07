import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Messages } from './entities/message.entity';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //Route to find all messages
  @HttpCode(201)
  @Get()
  findAll(@Query() pagination: any): Messages[] {
    const { limit = 10, offset = 0 } = pagination;
    // return `This route return all message. Limit=${limit} and offset=${offset}`;
    return this.messageService.findAll();
  }

  //Route to find one message
  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.messageService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.messageService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.messageService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.messageService.remove(id);
  }
}
