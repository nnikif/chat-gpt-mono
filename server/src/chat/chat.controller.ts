import { Controller, Post, Get, Body, Param, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // adjust the import path as necessary
import { ChatService } from './chat.service';
import { Request } from 'express';
import { User } from '../user/user.interface'; // adjust the import path as necessary

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createChat(@Req() req: Request & { user?: User }, @Body('title') title: string) {
        if (!req.user) {
            throw new UnauthorizedException();
        }
        return this.chatService.createChat(req.user?.userId, title);
    }

    @UseGuards(JwtAuthGuard)
    @Post('titles/:chatId')
    addMessage(
        @Req() req: Request & { user?: User },
        @Param('chatId') chatId: string,
        @Body('role') role: string,
        @Body('content') content: string
    ) {
        if (!req.user) {
            throw new UnauthorizedException();
        }

        return this.chatService.addMessage(chatId, role, content, req.user?.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('titles')
    listChatTitles(@Req() req: Request & { user?: User }) {
        if (!req.user) {
            throw new UnauthorizedException();
        }
        return this.chatService.listChatsByUser(req.user?.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('titles/:chatId')
    getChat(@Req() req: Request & { user?: User }, @Param('chatId') chatId: string) {
        if (!req.user) {
            throw new UnauthorizedException();
        }
        return this.chatService.getChatById(chatId, req.user?.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('username')
    getUsername(@Req() req: Request & { user?: User} ) {
        // console.log(req);
        // Assuming the user object is attached to the request
        // after successful authentication
        return { username: req.user?.username, userId:req.user?.userId };
    }

}
