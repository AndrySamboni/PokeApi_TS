import './style.css'
import { setupCounter } from './counter.ts'
import { getPokemon } from './bases/interfaces/pokeAPi/Interfaz_pocke';

async function loadData() {
    const pokemon = await getPokemon(1);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
   <div>
            <h1>PokeAPI</h1>
            <p>ID: ${pokemon.id}</p>
            <p>Nombre: ${pokemon.name}</p>
            <p>Tipos: ${pokemon.types.join(', ')}</p>
            <img src="${pokemon.image}" alt="${pokemon.name}" />
        </div>
    `;
}
loadData();

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
