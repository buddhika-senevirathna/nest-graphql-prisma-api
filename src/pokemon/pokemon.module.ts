import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonService } from './pokemon.service';

@Module({
    providers: [ PokemonResolver, PokemonService, PrismaService]
})
export class PokemonModule {}
