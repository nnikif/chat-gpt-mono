import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        // console.log(username, pass);
        const user = await this.userService.findOne(username);
        // console.log(user);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            // result.userId = user._id.toString();
            return {...result, userId: user._id.toString()};
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
