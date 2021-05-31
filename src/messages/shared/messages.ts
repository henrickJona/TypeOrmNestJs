import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Message } from '../entities/Message.entity';
import { SocketGateway } from '../../socket/shared/websocket.gateway';
@Injectable()
export class MessagesServices {
  constructor(
    @InjectRepository(Message)
    private readonly usersRepository: Repository<Message>,
    @Inject(forwardRef(() => SocketGateway))
    private readonly socketGateway: SocketGateway,
  ) {}

  create(createMessageDto: CreateMessageDto): Promise<Message> {
    console.log('novaMensagemsss');
    const message = new Message();
    message.content = createMessageDto.content;
    console.log('novaMensagem');
    this.socketGateway.broadcast('chat', message.content);
    return this.usersRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Message> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
