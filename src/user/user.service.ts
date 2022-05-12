import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { sign } from "jsonwebtoken";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    async users():Promise<User[]>{
        return await this.prisma.user.findMany({});
    }

    async user(id: string):Promise<User | null>{
        return await this.prisma.user.findUnique({ 
            where: {
                id: parseInt(id),
            },
        });
    }

    async createUser(data: Prisma.UserCreateInput):Promise<User>{
        let password = data.password;

        // find the user
        const user = await this.prisma.user.findFirst({ 
            where: {
                email: data.email,
            },
        });

        if (user) {
            throw new HttpException("User already exists", HttpStatus.UNAUTHORIZED);
        }

        delete data.password;
        const hashPassword = await bcrypt.hash(password, 10);
        data.password = hashPassword;

        const newUser = await this.prisma.user.create({
            data
        });

        delete newUser.password;

        return newUser;
    }

    async updateUser(params): Promise<User>{
        const { data, where } = params;

        let password = data.password;
        delete data.password;
        const hashPassword = await bcrypt.hash(password, 10);
        data.password = hashPassword;

        return this.prisma.user.update({
            where: where,
            data: data,
        })
    }

    async deleteUser(id: string):Promise<User>{
        return this.prisma.user.delete({
            where:{
                id: parseInt(id)
            }
        });
    }

    async loginUser(email: string, password:string):Promise<String>{
        // find the user
        const user = await this.prisma.user.findFirst({ 
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED);
        }
        // compare the passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("invalid_credentials");
        }

        delete user.password;
        //generate 
        const token = sign({ userId: user.id }, "APP_SECRET");

        return token;
        
    }
}
