import axios from 'axios';
import type { PockeapiResponse } from './pockeapi-response.interface';

export type PokemonData = {
    id:    number;
    name:  string;
    image: string;
    types: string[];
}

export const getPokemon = async (pokemonId: number): Promise<PokemonData> => {

    const { data } = await axios.get<PockeapiResponse>(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    const { id, name, sprites, types } = data;

    return {
        id,
        name,
        image: sprites.other?.['official-artwork'].front_default ?? sprites.front_default,
        types: types.map(({ type }) => type.name),
    };
}