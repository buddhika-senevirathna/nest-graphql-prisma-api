
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class NewPokemon {
    title: string;
    height: number;
    weight: number;
    image: string;
    description: string;
    createdById?: Nullable<number>;
}

export class UpdatePokemon {
    id: string;
    title?: Nullable<string>;
    height?: Nullable<number>;
    weight?: Nullable<number>;
    image?: Nullable<string>;
    description?: Nullable<string>;
    createdById?: Nullable<number>;
}

export class NewUser {
    name?: Nullable<string>;
    email: string;
    password: string;
}

export class UpdateUser {
    id: string;
    name?: Nullable<string>;
    email: string;
    password: string;
    role?: Nullable<string>;
}

export class Pokemon {
    id: string;
    title?: Nullable<string>;
    height?: Nullable<number>;
    weight?: Nullable<number>;
    image?: Nullable<string>;
    description?: Nullable<string>;
    createdById?: Nullable<number>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class PokemonWhereUniqueInput {
    id?: Nullable<string>;
    title?: Nullable<string>;
}

export abstract class IQuery {
    abstract pokemons(): Pokemon[] | Promise<Pokemon[]>;

    abstract pokemon(id: string): Nullable<Pokemon> | Promise<Nullable<Pokemon>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createPokemon(input?: Nullable<NewPokemon>): Pokemon | Promise<Pokemon>;

    abstract updatePokemon(input?: Nullable<UpdatePokemon>): Nullable<Pokemon> | Promise<Nullable<Pokemon>>;

    abstract deletePokemon(id: string): Nullable<Pokemon> | Promise<Nullable<Pokemon>>;

    abstract createUser(input?: Nullable<NewUser>): User | Promise<User>;

    abstract updateUser(input?: Nullable<UpdateUser>): Nullable<User> | Promise<Nullable<User>>;

    abstract loginUser(email?: Nullable<string>, password?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id?: Nullable<number>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    role?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class LoggedUser {
    id: string;
    name?: Nullable<string>;
    email: string;
    role?: Nullable<string>;
    token?: Nullable<string>;
}

type Nullable<T> = T | null;
