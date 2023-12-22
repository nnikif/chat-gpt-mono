import {Controller, Get, Post, Req, Res, UseGuards, Body, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request, Response } from 'express';
import {LoginDto} from "./login.dto";
import {JwtService} from "@nestjs/jwt";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request, @Res() res: Response) {
        const expirationDate = new Date(Date.now() + 3 * 60 * 60 * 1000);
        const token = await this.authService.login(req.user);
        res.cookie('Authentication', token.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // Secure in production
            sameSite: 'strict',
            expires: expirationDate
            // The cookie is not accessible via JavaScript
            // You might want to set other cookie options, such as 'secure: true' for HTTPS
        });
        return res.send({ message: 'Logged in successfully' });
    }

    @Post('login-token')
    async loginReturnToken(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        // console.log('user: ', user);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user.userId };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }


    @Get('logout')
    async logout(@Res() res: Response) {
        res.clearCookie('Authentication')
        return res.send({ message: 'Logged out successfully' });
    }
}
