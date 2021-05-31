import redisConfig from '../../config/redis';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Cache } from '../../cache/shared/cache';
import { Socket, Server } from 'socket.io';
import { ISocketEvents } from '../dto/socket.dto';
import { Logger, forwardRef, Inject } from '@nestjs/common';
import { MessagesServices } from '../../messages/shared/messages';
const { keys } = redisConfig;

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SocketGateway');
  constructor(
    private readonly cacheService: Cache,
    @Inject(forwardRef(() => MessagesServices))
    private readonly messagesServices: MessagesServices,
  ) {}
  @SubscribeMessage('chat')
  handleEvent(@MessageBody() data: string): void {
    this.messagesServices.create({ content: data });
    console.log('gdgdgggggggggg', data);
  }

  async handleConnection(client: Socket) {
    const { id: idChannel } = client;
    const { user_id } = client.handshake.query;
    const { userChannel } = redisConfig.keys;
    console.log('teste', user_id, idChannel);
    const keycache = userChannel(user_id);
    this.cacheService.save(keycache, idChannel);
  }

  afterInit(server: Server) {
    this.logger.log('init');
  }

  async handleDisconnect(client: Socket) {
    const { user_id } = client.handshake.query;
    const { userChannel } = redisConfig.keys;

    const keycache = userChannel(user_id);
    this.cacheService.invalidade(keycache);
  }

  listAllChannels() {
    return this.cacheService.getKeysByPrefix('socket');
  }

  emit(event: string, data: any, channel?: string) {
    if (channel) {
      this.server.to(channel).emit(event, data);
    } else {
      this.server.emit(event, data);
    }
  }

  broadcast(event: string, data: any) {
    this.emit(event, data);
  }

  findChannel(key: string) {
    const keycache = keys.userChannel(key);

    return this.cacheService.recover<string>(keycache);
  }

  async emitToUser(toUser: string, event: ISocketEvents, data: any) {
    const channel = await this.findChannel(toUser);

    if (channel) {
      this.emit(event, data, channel);
      return true;
    }
    return false;
  }
}
