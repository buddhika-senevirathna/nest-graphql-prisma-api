import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

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

    async findUser(email: string):Promise<User | null>{
        return await this.prisma.user.findUnique({ 
            where: {
                email: email,
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
            throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
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
}
