import React, { useEffect, useState } from "react";
import PokemonThumbnail from "./components/PokemonThumbnail";
import './components/styles/App.css';

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

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
        <img src="/images/background.jpg" alt="background" />
        <h1 className="centered-header">
          POKEMON EVOLUTION
        </h1>
      </div>

      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon) => (
            <PokemonThumbnail
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={pokemon.id} // Ensure key is unique for React to efficiently render
            />
          ))}
        </div>
        <button className="load-more" onClick={getAllPokemons}>Load more</button>
      </div>
    </div>
  );
}

export default App;
