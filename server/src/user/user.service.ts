// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}


    async createOrUpdate(username: string, pass: string): Promise<UserDocument> {
        const hashedPassword = await bcrypt.hash(pass, 10);
        const existingUser = await this.userModel.findOne({ username }).exec();

        if (existingUser) {
            // User exists, update the password
            existingUser.password = hashedPassword;
            return existingUser.save();
        } else {
            // User doesn't exist, create a new user
            const newUser = new this.userModel({ username, password: hashedPassword });
            return newUser.save();
        }
    }

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findOne(username: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({ username }).exec();
        if (!user) return null;
        return user.toObject();
    }

    async updateById(id: string): Promise<Boolean> {
        const user = await this.userModel.findOneAndUpdate(
            { _id: id },
            { $inc: { answers: 1 } }, // Increment 'answers' field by 1
            { new: true, upsert: true } // Return the updated document and create if not exists
        ).exec();
        if (!user) return false;
        return true;
    }
}
