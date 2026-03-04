import './styles.css';
import { getPokemon } from  './bases/interfaces/pokeAPi/Interfaz_pocke';
import type { PokemonData } from './bases/interfaces/pokeAPi/Interfaz_pocke';

// Lista de IDs a mostrar
const pokemonIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

// Guardamos los pokémon descubiertos
const discoveredPokemons: Set<number> = new Set();

// Carga todos los pokémon
async function loadPokemons() {
    const promises = pokemonIds.map(id => getPokemon(id));
    const pokemons = await Promise.all(promises);
    renderPokemons(pokemons);
}

// Renderiza la lista
function renderPokemons(pokemons: PokemonData[]) {
    const app = document.querySelector<HTMLDivElement>('#app')!;

    app.innerHTML = `
        <h1>Pokémon</h1>
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Busca un pokémon..." />
            <button id="searchBtn">Buscar</button>
        </div>
        <div class="pokemon-grid">
            ${pokemons.map(pokemon => `
                <div class="pokemon-card ${discoveredPokemons.has(pokemon.id) ? 'discovered' : 'undiscovered'}">
                    <img src="${pokemon.image}" alt="${pokemon.name}" />
                    <h3>${pokemon.name}</h3>
                    <p>${pokemon.description}</p>
                    <div class="types">
                        ${pokemon.types.map(type => `<span class="type">${type}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Evento de búsqueda
    document.getElementById('searchBtn')!.addEventListener('click', () => {
        const input = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase().trim();
        const found = pokemons.find(p => p.name.toLowerCase() === input);

        if (found) {
            discoveredPokemons.add(found.id);
            renderPokemons(pokemons);
        } else {
            alert('Pokémon no encontrado');
        }
    });
}

loadPokemons();