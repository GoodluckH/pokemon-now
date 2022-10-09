import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

// with pagination
const POKEMON_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/?limit=2000";
const NUMBER_OF_POKEMONS_PER_PAGE = 20;

// with buttons next and previous
const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [startingIndex, setStartingIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(POKEMON_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data.results);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    setStartingIndex(startingIndex + NUMBER_OF_POKEMONS_PER_PAGE);
  };

  const handlePrevious = () => {
    setStartingIndex(startingIndex - NUMBER_OF_POKEMONS_PER_PAGE);
  };

  // use tailwind css to display a grid of cards with the pokemon's name and image
  // the grid should be responsive with 1 columns on mobile, 3 on tablet and 5 on desktop
  return (
    <>
      {loading ? (
        <div className="spinner-border" role="status">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="max-w-4xl px-5">
          <div className="flex justify-center">
            <button onClick={handlePrevious} disabled={startingIndex === 0}>
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={startingIndex > pokemons.length - 1}
            >
              Next
            </button>
          </div>
          <div className="grid gap-5 mx-auto md:grid-cols-4 lg:max-w-none my-10">
            {pokemons
              .slice(startingIndex, startingIndex + NUMBER_OF_POKEMONS_PER_PAGE)
              .map((pokemon, index) => (
                <button
                  key={index}
                  className="flex select-none flex-col transform rounded-xl
                  shadow-lg border border-gray-300 overflow-hidden
                  hover:opacity-75 transition-opacity bg-white
                  focus:outline-none focus:shadow-xl duration-200"
                >
                  <PokemonCard pokemon={pokemon} />
                </button>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Pokemons;
