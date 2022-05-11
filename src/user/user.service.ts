import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
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

    async createUser(data: Prisma.UserCreateInput):Promise<User>{
        return this.prisma.user.create({
            data
        });
    }

    async updateUser(params): Promise<User>{
        const { data, where } = params;
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
