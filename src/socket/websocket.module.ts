import { Module } from '@nestjs/common';
import {SocketGateway} from '../socket/shared/websocket.gateway'
import {CacheModule} from '../cache/cache.module'
@Module({
    imports:[CacheModule],
    providers: [SocketGateway],
    exports:[SocketGateway]
})
export class WebsocketModule {}
