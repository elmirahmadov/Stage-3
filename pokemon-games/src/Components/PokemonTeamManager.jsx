"use client";
import React, { useState, useEffect } from "react";
import styles from "./PokemonTeamManager.module.css";

const PokemonTeamManager = () => {
  const initialPokemonList = [
    { id: 4, name: "Charmander", type: "fire" },
    { id: 7, name: "Squirtle", type: "water" },
    { id: 11, name: "Metapod", type: "bug" },
    { id: 12, name: "Butterfree", type: "flying" },
    { id: 25, name: "Pikachu", type: "electric" },
    { id: 39, name: "Jigglypuff", type: "normal" },
    { id: 94, name: "Gengar", type: "poison" },
    { id: 133, name: "Eevee", type: "normal" },
  ];

  const [team, setTeam] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const getTypeDetails = (type) => {
    const typeDetails = {
      fire: { color: "#FF5722", icon: "🔥" },
      water: { color: "#2196F3", icon: "💧" },
      bug: { color: "#8BC34A", icon: "🐛" },
      flying: { color: "#90CAF9", icon: "🦋" },
      electric: { color: "#FFEB3B", icon: "⚡" },
      normal: { color: "#A4A4A4", icon: "⭐" },
      poison: { color: "#9C27B0", icon: "☠️" },
    };
    return typeDetails[type] || { color: "#A4A4A4", icon: "⭐" };
  };

  const formatId = (id) => {
    return id.toString().padStart(3, "0");
  };

  const displayedPokemon = initialPokemonList.slice(0, 5);

  const addToTeam = (pokemon) => {
    const existingPokemon = team.find((p) => p.id === pokemon.id);

    if (existingPokemon) {
      const updatedTeam = team.map((p) =>
        p.id === pokemon.id ? { ...p, count: p.count + 1 } : p
      );
      setTeam(updatedTeam);
    } else {
      setTeam([...team, { ...pokemon, count: 1 }]);
    }

    setTotalCount(totalCount + 1);
  };

  const incrementCount = (pokemonId) => {
    const updatedTeam = team.map((pokemon) =>
      pokemon.id === pokemonId
        ? { ...pokemon, count: pokemon.count + 1 }
        : pokemon
    );
    setTeam(updatedTeam);
    setTotalCount(totalCount + 1);
  };

  const decrementCount = (pokemonId) => {
    const pokemonToUpdate = team.find((p) => p.id === pokemonId);

    if (pokemonToUpdate && pokemonToUpdate.count > 1) {
      const updatedTeam = team.map((pokemon) =>
        pokemon.id === pokemonId
          ? { ...pokemon, count: pokemon.count - 1 }
          : pokemon
      );
      setTeam(updatedTeam);
      setTotalCount(totalCount - 1);
    } else if (pokemonToUpdate && pokemonToUpdate.count === 1) {
      removePokemon(pokemonId);
    }
  };

  const removePokemon = (pokemonId) => {
    const pokemonToRemove = team.find((p) => p.id === pokemonId);
    if (pokemonToRemove) {
      const updatedTeam = team.filter((p) => p.id !== pokemonId);
      setTeam(updatedTeam);
      setTotalCount(totalCount - pokemonToRemove.count);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pokémon Team Manager</h1>

      <div className={styles.selectionArea}>
        {displayedPokemon.map((pokemon) => {
          const typeDetails = getTypeDetails(pokemon.type);
          return (
            <div
              key={pokemon.id}
              className={styles.pokemonCard}
              style={{ borderTop: `4px solid ${typeDetails.color}` }}
            >
              <div
                className={styles.typeIcon}
                style={{ backgroundColor: typeDetails.color }}
              >
                {typeDetails.icon}
              </div>
              <img
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatId(
                  pokemon.id
                )}.png`}
                alt={pokemon.name}
                className={styles.pokemonImage}
              />
              <div className={styles.pokemonName}>{pokemon.name}</div>
              <div
                className={styles.pokemonType}
                style={{ backgroundColor: typeDetails.color }}
              >
                {pokemon.type}
              </div>
              <button
                className={styles.addButton}
                onClick={() => addToTeam(pokemon)}
              >
                Add to Team
              </button>
            </div>
          );
        })}
      </div>

      <h2 className={styles.sectionTitle}>Your Pokémon Team</h2>
      <div className={styles.teamContainer}>
        {team.map((pokemon) => {
          const typeDetails = getTypeDetails(pokemon.type);
          return (
            <div
              key={pokemon.id}
              className={styles.teamRow}
              style={{ borderLeft: `4px solid ${typeDetails.color}` }}
            >
              <div className={styles.teamPokemonInfo}>
                <img
                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatId(
                    pokemon.id
                  )}.png`}
                  alt={pokemon.name}
                  className={styles.teamPokemonImage}
                />
                <div className={styles.pokemonDetails}>
                  <span className={styles.teamPokemonName}>{pokemon.name}</span>
                  <span
                    className={styles.teamPokemonType}
                    style={{ backgroundColor: typeDetails.color }}
                  >
                    {typeDetails.icon} {pokemon.type}
                  </span>
                </div>
              </div>
              <div className={styles.teamControls}>
                <button
                  className={styles.decrementButton}
                  onClick={() => decrementCount(pokemon.id)}
                >
                  -
                </button>
                <div className={styles.countBadge}>{pokemon.count}</div>
                <button
                  className={styles.incrementButton}
                  onClick={() => incrementCount(pokemon.id)}
                >
                  +
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => removePokemon(pokemon.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.totalCount}>
        Total Pokémon in Team: {totalCount}
      </div>
      <h3 className={styles.tableTitleText}>Individual Pokémon Count</h3>
      <table className={styles.countTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Nickname</th>
            <th className={styles.tableHeader}>Count</th>
            <th className={styles.tableHeader}>Type</th>
          </tr>
        </thead>
        <tbody>
          {team.map((pokemon) => {
            const typeDetails = getTypeDetails(pokemon.type);
            return (
              <tr key={pokemon.id}>
                <td className={styles.tableCell}>{pokemon.name}</td>
                <td className={styles.tableCell}>{pokemon.count}</td>
                <td className={styles.tableCell}>
                  <span
                    className={styles.typeBadge}
                    style={{ backgroundColor: typeDetails.color }}
                  >
                    {typeDetails.icon} {pokemon.type}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonTeamManager;
