import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Message} from './entities/entity'
import {MessagesController} from './messages.controller'
import {MessagesServices} from  './shared/messages'
import {WebsocketModule} from '../socket/websocket.module'
@Module({
  imports: [TypeOrmModule.forFeature([Message]),WebsocketModule],
  providers: [MessagesServices],
  controllers: [MessagesController],
})
export class MessagesModule {}