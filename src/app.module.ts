import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import { WebsocketModule } from './socket/websocket.module';
import { Cache } from './cache/shared/cache';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      /*
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'test',
    entities: [Message],
    synchronize: true,*/
    }),
    MessagesModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, Cache],
})
export class AppModule {}
