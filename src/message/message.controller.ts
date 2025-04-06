import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';

@Controller('message')
export class MessageController {

    //Route to find all messages
    @HttpCode(201)
    @Get()
    findAll(): string {
        return "This route return all messages"
    }

    //Route to find one message
    @Get(":id")
    findOne(@Param('id') id :any): string {
        return `This route return an espefic message by id. Param id: ${id}`;
    }

    @Post()
    create(@Body() body: any) {
        return `This route create a message. Received message: "${body.message}"`;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any ) {
        return {
            id,
            ...body
        }
    }

}
