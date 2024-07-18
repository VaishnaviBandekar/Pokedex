import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonThumbnail from "./components/PokemonThumbnail";
import Loader from "./components/Loader"; // Import the Loader component
import './components/styles/App.css';

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=10');

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);
    setHasMore(data.next !== null);

    const uniquePokemons = [];

    async function fetchUniquePokemon(result) {
      for (let pokemon of result) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();
        if (!uniquePokemons.some(p => p.id === data.id)) {
          uniquePokemons.push(data);
        }
      }
    }

    await fetchUniquePokemon(data.results);

    setAllPokemons(currentList => [...currentList, ...uniquePokemons]);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-container">
      <div className="bg">
        <img src="https://img.goodfon.com/wallpaper/nbig/7/b8/pokemon-pokebol-pikachu.webp" alt="background" />
        <h1 className="centered-header">
          POKEMON EVOLUTION
        </h1>
      </div>

      <div className="pokemon-container">
        <InfiniteScroll 
          style={{ overflowY: 'hidden' }} // Hide vertical scrollbar here
          dataLength={allPokemons.length}
          next={getAllPokemons}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={<p style={{ textAlign: 'center' }}>All Pokemons loaded</p>}
        >
          <div className="all-container">
            {allPokemons.map((pokemon) => (
              <PokemonThumbnail
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
                sound={`https://pokemoncries.com/cries-old/${pokemon.id}.mp3`} // Example sound URL
                stats={{
                  hp: pokemon.stats[0].base_stat,
                  attack: pokemon.stats[1].base_stat,
                  defense: pokemon.stats[2].base_stat,
                  speed: pokemon.stats[5].base_stat
                }}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
