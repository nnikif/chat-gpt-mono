import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class OpenAiService {
    async getChatCompletions(messages: any[]): Promise<any> {
        const url = 'https://api.openai.com/v1/chat/completions';
        const apiKey = process.env.OPENAI_API_KEY; // Replace with your OpenAI API key

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };

        const body = {
            model: "gpt-4-1106-preview",
            max_tokens: 1300,
            messages: messages.slice(-30),
        };

        try {
            const response: AxiosResponse = await axios.post(url, body, { headers });
            return response.data;
        } catch (error) {
            // Handle or throw the error appropriately
            console.error(error);
            throw error;
        }
    }
}
