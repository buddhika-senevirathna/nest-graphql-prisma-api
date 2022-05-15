import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,       
    ){}

    async validateUser(email:string, password:string):Promise<any>{
        const user = await this.userService.findUser(email);
        
        // compare the passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid && user) {
            const{ password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {    
        return {
            access_token: this.jwtService.sign({
                email: user.email,
                sub: user.id,
            }),
            user,
        }
    }
}
