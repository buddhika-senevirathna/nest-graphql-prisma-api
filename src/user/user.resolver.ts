import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewUser, UpdateUser } from 'src/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
    constructor(private userService: UserService){}

    @Query('users')
    async users(){
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
    async update(@Args('input') args: UpdateUser) {
        let id = args.id;
        delete args.id;
        return this.userService.updateUser({where:id, data:args});
    }

    @Mutation('deleteUser')
    async delete(@Args('id') args: string) {
        return this.userService.deleteUser(args);
    }

    // User authentication
    @Mutation('loginUser')
    async loginUser(@Args('email') email:string, @Args('password') password:string) {
        return this.userService.loginUser(email, password);
    }
}
