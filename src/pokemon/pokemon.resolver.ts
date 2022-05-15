import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Info, Context } from '@nestjs/graphql';
import { JWtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Filters, NewPokemon, PokemonWhereUniqueInput, SortBy, UpdatePokemon } from 'src/graphql';
import { PokemonService } from './pokemon.service';

@Resolver('Pokemon')
export class PokemonResolver {
    constructor(private readonly pokemonService: PokemonService) {}

    @Query('pokemons')
    @UseGuards(JWtAuthGuard)
    async pokemons() {
        return this.pokemonService.pokemons();
    }

    @Query('pokemon')
    @UseGuards(JWtAuthGuard)
    async pokemon(@Args('id') args: string) {
        return this.pokemonService.pokemon(args);
    }

    @Query('getPokemons')
    @UseGuards(JWtAuthGuard)
    async getPokemons(@Args('filters') filters:Filters, @Args('sortBy') sortBy: SortBy) {
        return this.pokemonService.getPokemons(filters, sortBy);
    }

    @Mutation('createPokemon')
    @UseGuards(JWtAuthGuard)
    async create(@Args('input') args: NewPokemon, @Context() context) {
        console.log(context.req.user);
        return this.pokemonService.createPokemon(args, context.req.user);
    }

   @Mutation('updatePokemon')
   @UseGuards(JWtAuthGuard)
    async updatePokemon(@Args('input') args: PokemonWhereUniqueInput, @Context() context) {
        let id = args.id;
        delete args.id;
        return this.pokemonService.updatePokemon({where:id, data:args});
    }

    @Mutation('deletePokemon')
    @UseGuards(JWtAuthGuard)
    async delete(@Args('id') args: string, @Context() context) {
        return this.pokemonService.deletePokemon(args);
    }
}
