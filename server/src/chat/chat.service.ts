import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';
import {OpenAiService} from "./openai.service";
import {UserService} from "../user/user.service";

@Injectable()
export class ChatService {
    constructor(@InjectModel('Chat') private chatModel: Model<Chat>, private openAIService: OpenAiService, private userService: UserService) {}

    async createChat(userId: string, title: string): Promise<Chat> {
        const newChat = new this.chatModel({ user: userId, title, messages: [] });
        return newChat.save();
    }

    async addMessage(chatId: string, role: string, content: string, userId: string): Promise<Chat> {
        const chat = await this.chatModel.findOne({ _id: chatId, user: userId });
        if (!chat) throw new Error('Chat not found or access denied');
        const response = await this.openAIService.getChatCompletions([...chat.messages.map(
            ({role, content}) => ({ role, content })
        ), {role, content}]);
        const answer = response?.choices[0]?.message;
        await this.userService.updateById(userId);
        chat.messages.push({ role, content }, answer || []);
        return chat.save();
    }

    async listChatsByUser(userId: string): Promise<{ id: string, title: string }[]> {
        const chats = await this.chatModel.find({ user: userId }, 'title');
        return chats.map(chat => ({ id: chat._id.toString(), title: chat.title }));
    }

    async getChatById(chatId: string, userId: string): Promise<Chat> {
        const chat = await this.chatModel.findOne({ _id: chatId, user: userId });
        if (!chat) {
            throw new Error('Chat not found or access denied');
        }

        return chat;
    }

    // Other necessary methods...
}

