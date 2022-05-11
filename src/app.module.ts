import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonService } from './pokemon/pokemon.service';
import { PokemonResolver } from './pokemon/pokemon.resolver';
import { PokemonModule } from './pokemon/pokemon.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaService } from './prisma/prisma.service';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      debug: true,
      playground: true,
    }),
    PokemonModule,
    UserModule,
  ],
  controllers: [],
  providers: [ PokemonResolver, PokemonService, PrismaService, UserResolver, UserService],
})
export class AppModule {}
