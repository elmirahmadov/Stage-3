import React from "react";
import styles from "./PokemonCard.module.css";

const PokemonCard = ({ pokemon }) => {
  const formatId = (id) => id.toString().padStart(3, "0");

  return (
    <div className={styles.card}>
      <img
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatId(
          pokemon.id
        )}.png`}
        alt={pokemon.name}
      />
      <h3>{pokemon.name}</h3>
      <p>Type: {pokemon.type}</p>
      <p>XP: {pokemon.base_experience}</p>
    </div>
  );
};

export default PokemonCard;
