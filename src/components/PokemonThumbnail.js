import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import './styles/PokemonThumbnail.css';
import Loader from './Loader';

const PokemonThumbnail = ({ id, name, image, type, sound, stats }) => {
  const [loading, setLoading] = useState(true);

  const getTypeColor = () => {
    switch (type) {
      case 'grass':
        return '#78C850';
      case 'fire':
        return '#F08030';
      case 'water':
        return '#6890F0';
      case 'bug':
        return '#A8B820';
      case 'normal':
        return '#A8A878';
      case 'poison':
        return '#A040A0';
      case 'electric':
        return '#F8D030';
      case 'ground':
        return '#E0C068';
      case 'fairy':
        return '#EE99AC';
      case 'fighting':
        return '#C03028';
      case 'psychic':
        return '#F85888';
      case 'rock':
        return '#B8A038';
      case 'ghost':
        return '#705898';
      case 'ice':
        return '#98D8D8';
      case 'dragon':
        return '#7038F8';
      case 'dark':
        return '#705848';
      case 'steel':
        return '#B8B8D0';
      case 'flying':
        return '#A890F0';
      default:
        return '#B0B0B0';
    }
  };

  const playSound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  return (
    <div className="pokemon-thumbnail" style={{ backgroundColor: getTypeColor() }}>
      {loading && <Loader />}
      <img
        src={image}
        alt={name}
        style={{ display: loading ? 'none' : 'block' }}
        onLoad={() => setLoading(false)}
      />
      <h3>{name}</h3>
      <p>Type: {type}</p>
      <div className="stats">
        <p>HP: {stats.hp}</p>
        <p>Attack: {stats.attack}</p>
        <p>Defense: {stats.defense}</p>
        <p>Speed: {stats.speed}</p>
      </div>
      <div className="sound-icon" onClick={playSound}>
        <FontAwesomeIcon icon={faVolumeUp} /> Play Sound
      </div>
    </div>
  );
};

export default PokemonThumbnail;
