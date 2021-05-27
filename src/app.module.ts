import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MessagesModule} from './messages/messages.module'
import {Message} from './messages/entities/entity';
import { WebsocketModule } from './socket/websocket.module';
import {Cache} from './cache/shared/cache'
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Jonathan!1',
    database: 'test',
    entities: [Message],
    synchronize: true,
  }),MessagesModule,WebsocketModule],
  controllers: [AppController],
  providers: [AppService,Cache],
})
export class AppModule {}
