import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { Messages } from './entities/message.entity';
import { MessageController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
