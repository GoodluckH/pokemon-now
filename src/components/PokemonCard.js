import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import pokeballLoading from "./pokeball-loading.json";

const PokemonCard = ({ pokemon }) => {
  const [pokemonImage, setPokemonImage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((data) => {
        setPokemonImage(data.sprites.front_default);
        setLoading(false);
      });
  }, [pokemon.url]);

  return (
    <div className="card">
      <p>{pokemon.name}</p>
      <div className="flex-shrink-0 w-full justify-items-center">
        {loading ? (
          <Lottie animationData={pokeballLoading} />
        ) : (
          <img
            className="w-30 object-cover pointer-events-none"
            src={pokemonImage}
            alt={pokemon.name}
          />
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
