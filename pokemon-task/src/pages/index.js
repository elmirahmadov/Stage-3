import React, { useState } from "react";
import PokemonCard from "../components/PokemonCard";
import styles from "../styles/Home.module.css";

const pokemonData = [
  { id: 4, name: "Charmander", type: "fire", base_experience: 62 },
  { id: 7, name: "Squirtle", type: "water", base_experience: 63 },
  { id: 11, name: "Metapod", type: "bug", base_experience: 72 },
  { id: 12, name: "Butterfree", type: "flying", base_experience: 178 },
  { id: 25, name: "Pikachu", type: "electric", base_experience: 112 },
  { id: 39, name: "Jigglypuff", type: "normal", base_experience: 95 },
  { id: 94, name: "Gengar", type: "poison", base_experience: 225 },
  { id: 133, name: "Eevee", type: "normal", base_experience: 65 },
];

export default function Home() {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [winner, setWinner] = useState("");
  const [totalXP1, setTotalXP1] = useState(0);
  const [totalXP2, setTotalXP2] = useState(0);

  const startGame = () => {
    let shuffled = [...pokemonData].sort(() => 0.5 - Math.random());
    let teamA = shuffled.slice(0, 4);
    let teamB = shuffled.slice(4, 8);

    setTeam1(teamA);
    setTeam2(teamB);

    const totalXP1 = teamA.reduce((acc, p) => acc + p.base_experience, 0);
    const totalXP2 = teamB.reduce((acc, p) => acc + p.base_experience, 0);

    setTotalXP1(totalXP1);
    setTotalXP2(totalXP2);

    if (totalXP1 > totalXP2) {
      setWinner("team1");
    } else {
      setWinner("team2");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Pokedex Battle</h1>
      <button className={styles.startBtn} onClick={startGame}>
        Start Game
      </button>
      <h2>
        Team 1
        {winner === "team1" && (
          <span className={styles.winText}> (Winner 🏆)</span>
        )}
        {winner === "team2" && (
          <span className={styles.loseText}> (Loser ❌)</span>
        )}
        <p>Total XP: {totalXP1}</p>
      </h2>
      <div className={styles.teams}>
        <div
          className={`${styles.team} ${
            winner === "team1"
              ? styles.winner
              : winner === "team2"
              ? styles.loser
              : styles.draw
          }`}
        >
          <div className={styles.pokemonGrid}>
            {team1.map((pokemon) => (
              <div key={pokemon.id} className={styles[pokemon.type]}>
                <PokemonCard pokemon={pokemon} />
                <p className={styles[pokemon.type]}>{pokemon.name}</p>{" "}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.vs}>VS</div>
        <h2>
          Team 2
          {winner === "team2" && (
            <span className={styles.winText}> (Winner 🏆)</span>
          )}
          {winner === "team1" && (
            <span className={styles.loseText}> (Loser ❌)</span>
          )}
          <p>Total XP: {totalXP2}</p>
        </h2>
        <div
          className={`${styles.team} ${
            winner === "team2"
              ? styles.winner
              : winner === "team1"
              ? styles.loser
              : styles.draw
          }`}
        >
          <div className={styles.pokemonGrid}>
            {team2.map((pokemon) => (
              <div key={pokemon.id} className={styles[pokemon.type]}>
                <PokemonCard pokemon={pokemon} />
                <p className={styles[pokemon.type]}>{pokemon.name}</p>{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
