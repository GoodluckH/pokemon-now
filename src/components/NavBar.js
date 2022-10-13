import { useState } from "react";
import PokemonTypeColor from "../PokemonTypeColor";

// navbar with black background color and sticky position
const NavBar = (props) => {
  const [search, setSearch] = useState("");

  const { handleTypeSelected, selectedType } = props;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <nav
      className={`pb-3 w-full sticky top-0 z-50 transition duration-500 ease-in-out bg-white backdrop-filter backdrop-blur-md bg-opacity-80`}
    >
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

      {/* Filter by types using colors from PokemonTypeColor */}
      <div className="flex justify-center flex-wrap m-2">
        {Object.keys(PokemonTypeColor.bg).map((type) => (
          <button
            key={type}
            onClick={() => handleTypeSelected(type)}
            className={`${
              selectedType === type
                ? PokemonTypeColor.bg[type]
                : `bg-gray-900 shadow-lg`
            } hover:${PokemonTypeColor.bg[type]} ${
              PokemonTypeColor.text[type]
            }  py-1 px-3 rounded-full text-s 
            font-medium m-1`}
          >
            {type}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
