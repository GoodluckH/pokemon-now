import { useEffect, useState } from "react";
import PokemonTypeColor from "../PokemonTypeColor";
import PokemonCard from "./PokemonCard";

// navbar with black background color and sticky position
const NavBar = (props) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const {
    pokemons,
    handleNext,
    handlePrevious,
    handleFirst,
    handleLast,
    startingIndex,
  } = props;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <nav className="bg-red-700 sticky top-0 z-50 w-full">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a pokemon"
            value={search}
            onChange={handleChange}
          />
          <button type="submit" className="bg-red-100">
            Search
          </button>
        </form>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center">
        <div className="inline-flex">
          <button
            onClick={handleFirst}
            disabled={startingIndex === 0}
            className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:bg-gray-400"
          >
            First
          </button>
          <button
            onClick={handlePrevious}
            disabled={startingIndex === 0}
            className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 disabled:bg-gray-400"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={startingIndex >= pokemons.length - 20}
            className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 disabled:bg-gray-400"
          >
            Next
          </button>
          <button
            onClick={handleLast}
            disabled={startingIndex >= pokemons.length - 20}
            className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:bg-gray-400"
          >
            Last
          </button>
        </div>
      </div>

      {/* Filter by types using colors from PokemonTypeColor */}
      <div className="flex justify-center">
        {Object.keys(PokemonTypeColor.bg).map((type) => (
          <button
            key={type}
            className={`${PokemonTypeColor.bg[type]} hover:${PokemonTypeColor.bg[type]} ${PokemonTypeColor.text[type]} font-bold py-2 px-4 rounded-l`}
          >
            {type}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
