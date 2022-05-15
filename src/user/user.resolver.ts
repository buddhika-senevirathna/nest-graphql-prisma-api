import { UseGuards } from '@nestjs/common';
import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JWtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { NewUser, UpdateUser } from 'src/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
    constructor(private userService: UserService){}

    @Query('users')
    @UseGuards(JWtAuthGuard)
    async users(@Context() context){
        return this.userService.users();
    }

    @Query('user')
    async user(@Args('id') args: string){
        return this.userService.user(args);
    }

    @Mutation('createUser')
    async create(@Args('input') args: NewUser){
        return this.userService.createUser(args);
    }

    @Mutation('updateUser')
    @UseGuards(JWtAuthGuard)
    async update(@Args('input') args: UpdateUser, @Context() context) {
        let id = args.id;
        delete args.id;
        return this.userService.updateUser({where:id, data:args});
    }

    @Mutation('deleteUser')
    @UseGuards(JWtAuthGuard)
    async delete(@Args('id') args: string) {
        return this.userService.deleteUser(args);
    }
}
