import { useState } from "react";
import Lottie from "lottie-react";
import pokeballLoading from "./pokeball-loading.json";

const PokemonCard = ({ pokemon }) => {
  const [loading, setLoading] = useState(false);

  const handleImageOnLoad = () => {
    console.log("image loaded");
    setLoading(false);
  };
  return (
    <div className="card">
      <div>
        <p className="font-black">{pokemon.name}</p>
      </div>
      <div className="mt-3 flex-shrink-0 w-full justify-items-center">
        {loading ? (
          <Lottie animationData={pokeballLoading} />
        ) : (
          <img
            className="w-40 object-cover pointer-events-none"
            src={pokemon.image}
            alt={pokemon.name}
            onLoad={handleImageOnLoad}
          />
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
