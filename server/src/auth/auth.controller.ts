import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request, @Res() res: Response) {
        const token = await this.authService.login(req.user);
        res.cookie('Authentication', token.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // Secure in production
            sameSite: 'strict',
            // The cookie is not accessible via JavaScript
            // You might want to set other cookie options, such as 'secure: true' for HTTPS
        });
        return res.send({ message: 'Logged in successfully' });
    }
}
