import { Module, forwardRef } from '@nestjs/common';
import { SocketGateway } from '../socket/shared/websocket.gateway';
import { CacheModule } from '../cache/cache.module';
import { MessagesModule } from '../messages/messages.module';
@Module({
  imports: [forwardRef(() => MessagesModule), CacheModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class WebsocketModule {}
