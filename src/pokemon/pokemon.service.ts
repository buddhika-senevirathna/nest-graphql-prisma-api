import { Injectable } from '@nestjs/common';
import { Pokemon, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PokemonService {
    constructor(private readonly prisma: PrismaService){}

    async pokemon(id: string): Promise<Pokemon | null> {
        return this.prisma.pokemon.findUnique({
            where: {
                id: parseInt(id),
            },
        });
    }

    async pokemons(): Promise<Pokemon[]> {
        return this.prisma.pokemon.findMany({});
    }

    async createPokemon(data: Prisma.PokemonCreateInput): Promise<Pokemon> {
        return this.prisma.pokemon.create({
            data
        })
    }

    async updatePokemon(params): Promise<Pokemon>{
        const { data, where } = params;
        return this.prisma.pokemon.update({
            where: where,
            data: data,
        })
    }

    async deletePokemon(id: string): Promise<Pokemon> {
        return this.prisma.pokemon.delete({
            where: {
                id: parseInt(id),
            },
        });
    }
}
