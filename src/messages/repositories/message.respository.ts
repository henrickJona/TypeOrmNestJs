import { EntityRepository, Repository } from "typeorm";
import { CreateMessageDto } from "../dto/create-message.dto";
import {Message } from "../entities/Message.entity";

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
	createMessage(createMessageDto: CreateMessageDto) {
		const message = this.create(createMessageDto);

		return this.save(message);
	}

	async findAll(query: ITypeOrmQuery) {
		const { where, sort } = query;
		const messages = await this.find({
			where,
			order: sort,
		});

		return messages;
	}

	async findById(id: string) {
		const message = await this.findOne(id);

		return message;
	}

}