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

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //Route to find all messages
  @HttpCode(201)
  @Get()
  findAll(@Query() pagination: any): string {
    const { limit = 10, offset = 0 } = pagination;
    // return `This route return all message. Limit=${limit} and offset=${offset}`;
    return this.messageService.hello();
  }

  //Route to find one message
  @Get(':id')
  findOne(@Param('id') id: any): string {
    return `This route return an espefic message by id. Param id: ${id}`;
  }

  @Post()
  create(@Body() body: any) {
    return `This route create a message. Received message: "${body.message}"`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      id,
      ...body,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: any): string {
    return `Deleting message with id ${id}...`;
  }
}
