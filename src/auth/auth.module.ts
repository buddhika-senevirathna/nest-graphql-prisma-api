import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Localstrategy } from './strategy/local.strategy';

@Module({
    imports: [
        PassportModule, 
        UserModule,
       JwtModule.register({
            signOptions: { expiresIn: '3600s' },
            secret: process.env.JWT_SECRET,
        }),
    ],
    providers: [AuthService, AuthResolver, Localstrategy, JwtStrategy],
    exports:[JwtModule]
})
export class AuthModule {}
