import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { PersonModule } from './person/person.module';
import { MessageModule } from './message/message.module';
import { SimpleMiddleware } from './common/middlewares/simple.middleware';
import { AnotherMiddleware } from './common/middlewares/another.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: '123456',
      autoLoadEntities: true, //Charge entitites without specifications.
      synchronize: true, //Synchronize with DB(DONT USE ON PRODUTION!!!).
    }),
    MessageModule,
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '*', //It means that middleware 'SimpleMiddleware' is above all routes 
      method: RequestMethod.ALL, //It means that middleware 'SimpleMiddleware' uses all methods 
    });
    consumer.apply(AnotherMiddleware).forRoutes({
      path: '*', //It means that middleware 'AnotherMiddleware' is above all routes 
      method: RequestMethod.ALL, //It means that middleware 'AnotherMiddleware' uses all methods 
    });
  }
}
