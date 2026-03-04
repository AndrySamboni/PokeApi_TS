import axios from 'axios';
import type { RickapiResponse } from './rickapi-response.interface';


type CharacterData = {
    image: string;
    name: string;
    status: string;
    id: number;
};


export class Usuario {
    constructor(
        public id: number,
        public nombre: string,
        public edad: number
    )   {}

    get imagenUrl(): string {
        return `https://imagenUser.com/${this.id}`;
    }
    saludar(): string {
        return `Hola, soy ${this.nombre} con el id ${this.id}`;
    }

async getCharacter(characterId: number): Promise<CharacterData> {
    try {
        const { data: datosRick} = await axios.get<RickapiResponse>(

            `https://rickandmortyapi.com/api/character/${characterId}`  
        );

        const { image = '',name = 'desconocido',status = 'N/A', id } = datosRick;

        console.log(image);

        return { image, name, status, id };
    } catch (error) {
        console.error('Error al obtener los datos');
        throw error;
    }
}

}
export const userClass = new Usuario(1, 'Andry', 17);
