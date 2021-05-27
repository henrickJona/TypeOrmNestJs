import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { Message } from "./entities/Message.entity";
import {MessagesServices} from  "./shared/messages";

@Controller("messages")
export class MessagesController {
	constructor(private readonly messagesService: MessagesServices) {}

  @Post()
	create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
		return this.messagesService.create(createMessageDto);
	}

  @Get()
  findAll(): Promise<Message[]> {
  	return this.messagesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Message> {
  	return this.messagesService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
  	return this.messagesService.remove(id);
  }
}