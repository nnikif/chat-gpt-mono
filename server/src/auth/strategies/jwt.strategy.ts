// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {User} from "../../user/user.interface";
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                // console.log(request);
                    let token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

                    // If not found, fall back to the cookie
                    if (!token && request && request.cookies) {
                        token = request.cookies['Authentication']; // Your cookie name
                    }
                    return token;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any): Promise<User> {
        // console.log(payload);
        return { userId: payload.sub, username: payload.username };
    }
}
