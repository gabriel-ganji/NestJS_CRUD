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
  Query,
  UsePipes,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseInIdPipe } from 'src/common/pipes/parse-int-id.pipe';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //Route to find all messages
  @HttpCode(201)
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    const messages = this.messageService.findAll(pagination);
    return messages;
  }

  //Route to find one message
  @Get(':id')
  @UsePipes(ParseInIdPipe)
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  //Route to create/insert data in dbS
  @Post()
  create(@Body() createBodyDto: CreateMessageDto) {
    return this.messageService.create(createBodyDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.remove(id);
  }
}
