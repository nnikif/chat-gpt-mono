import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

interface Message {
    role: string;
    content: string;
}

export interface Chat extends Document {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    messages: Message[];
}

const messageSchema = new mongoose.Schema<Message>({
    role: { type: String, required: true },
    content: { type: String, required: true },
});

export const ChatSchema = new mongoose.Schema<Chat>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    messages: [messageSchema],
});

export const ChatModel = mongoose.model<Chat>('Chat', ChatSchema);
