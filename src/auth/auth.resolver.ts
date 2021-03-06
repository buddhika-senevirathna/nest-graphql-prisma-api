import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse, LoginUserInput } from 'src/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService){}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
        return this.authService.login(context.user);
    }
}
