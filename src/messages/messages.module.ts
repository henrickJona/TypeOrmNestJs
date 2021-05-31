import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/Message.entity';
import { MessagesController } from './messages.controller';
import { MessagesServices } from './shared/messages';
import { WebsocketModule } from '../socket/websocket.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => WebsocketModule),
  ],
  providers: [MessagesServices],
  controllers: [MessagesController],
  exports: [MessagesServices],
})
export class MessagesModule {}
