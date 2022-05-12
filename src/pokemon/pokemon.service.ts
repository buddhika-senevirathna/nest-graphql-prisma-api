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

    async getPokemons(filters, sortBy): Promise<Pokemon[]> {
        // Allowed page counts
        const allowedPageCounts = [10, 20, 50];

        // default page count 10 will add to the page count 
        // if not provided user provided any wrong page count 
        const take = filters.take && allowedPageCounts.includes(filters.take) ? filters.take : 10;

        const where = (filters.title || filters.weightfrom || filters.weightto || filters.heightfrom || filters.heightto)
          ? {
              AND: [
                { title: {contains: filters.filter }},
                { weight: {gte: filters.weightfrom }},
                { weight: {lte: filters.weightto }},
                { height: {gte: filters.heightfrom }},
                { height: {lte: filters.heightto }},
              ],
            }
          : {};

        return this.prisma.pokemon.findMany({
            where,
            skip: filters.skip,
            take: take,
        });
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
