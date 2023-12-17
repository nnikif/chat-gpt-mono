// user.controller.ts
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiKeyGuard } from '../api-key.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UseGuards(ApiKeyGuard)
    create(@Body('username') username: string, @Body('password') password: string) {
        return this.userService.createOrUpdate(username, password);
    }

    @Get()
    @UseGuards(ApiKeyGuard)
    findAll() {
        return this.userService.findAll();
    }
}
