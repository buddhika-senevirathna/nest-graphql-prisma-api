import { Resolver, Query, Args, Mutation, Info } from '@nestjs/graphql';
import { NewPokemon, PokemonWhereUniqueInput, UpdatePokemon } from 'src/graphql';
import { PokemonService } from './pokemon.service';

@Resolver('Pokemon')
export class PokemonResolver {
    constructor(private readonly pokemonService: PokemonService) {}

    @Query('pokemons')
    async pokemons() {
        return this.pokemonService.pokemons();
    }

    @Query('pokemon')
    async pokemon(@Args('id') args: string) {
        return this.pokemonService.pokemon(args);
    }

    @Mutation('createPokemon')
    async create(@Args('input') args: NewPokemon) {
        return this.pokemonService.createPokemon(args);
    }

   @Mutation('updatePokemon')
    async updatePokemon(@Args('input') args: PokemonWhereUniqueInput, @Info() info: UpdatePokemon) {
        let id = args.id;
        delete args.id;
        return this.pokemonService.updatePokemon({where:id, data:args});
    }

    @Mutation('deletePokemon')
    async delete(@Args('id') args: string) {
        return this.pokemonService.deletePokemon(args);
    }
}