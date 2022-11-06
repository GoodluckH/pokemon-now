import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import PokemonDetail from "./PokemonDetail";
import PokemonCart from "./PokemonCart";
import PokemonTypeColor from "../PokemonTypeColor";
import NavBar from "./NavBar";
import NavButtons from "./NavButtons";
import Lottie from "lottie-react";
import mainLoading from "./main-loading.json";
import { useLocation } from "react-router-dom";
// with pagination
const POKEMON_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/?limit=1000";
const NUMBER_OF_POKEMONS_PER_PAGE = 20;

// with buttons next and previous
const Pokemons = () => {
  const [pokemons, setPokemons] = useState(new Map());
  const [startingIndex, setStartingIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPokemon, setCurrentPokemon] = useState();
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    fetch(POKEMON_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        Promise.all(
          data.results.map((pokemon) => Promise.resolve(fetch(pokemon.url)))
        )
          .then((responses) => responses.map((response) => response.json()))
          .then((pokemons) => {
            Promise.all(pokemons).then((pokemons) => {
              const pokemonsMap = new Map();
              pokemons.forEach((pokemon) => {
                pokemonsMap.set(pokemon.id, {
                  id: pokemon.id,
                  name: pokemon.name,
                  image: pokemon.sprites.front_default,
                  types: pokemon.types,
                  stats: pokemon.stats,
                });
              });
              setPokemons(pokemonsMap);
              setLoading(false);

              console.log(location.state.collections);
            });
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleNext = () => {
    setStartingIndex(
      Math.min(
        startingIndex + NUMBER_OF_POKEMONS_PER_PAGE,
        pokemons.size - (pokemons.size % NUMBER_OF_POKEMONS_PER_PAGE) - 1
      )
    );
  };

  const handlePrevious = () => {
    setStartingIndex(startingIndex - NUMBER_OF_POKEMONS_PER_PAGE);
  };

  const handleFirst = () => {
    setStartingIndex(0);
  };

  const handleLast = () => {
    setStartingIndex(
      pokemons.size - (pokemons.size % NUMBER_OF_POKEMONS_PER_PAGE) - 1
    );
  };

  const handleTypeSelected = (type) => {
    setSelectedType(type);
  };

  const handleSelectPokemon = (pokemon) => {
    if (!selectedPokemons.includes(pokemon)) {
      setSelectedPokemons([...selectedPokemons, pokemon]);
    } else {
      setSelectedPokemons(
        selectedPokemons.filter(
          (selectedPokemon) => selectedPokemon !== pokemon
        )
      );
    }
  };

  // use tailwind css to display a grid of cards with the pokemon's name and image
  // the grid should be responsive with 1 columns on mobile, 3 on tablet and 5 on desktop
  return (
    <div className="flex justify-center">
      <PokemonDetail
        isOpen={currentPokemon !== undefined}
        onClose={() => setCurrentPokemon(undefined)}
        pokemon={currentPokemon}
        onSelectPokemon={handleSelectPokemon}
        selectedPokemons={selectedPokemons}
      />
      {loading ? (
        <div className="spinner-border w-20 flex justify-center">
          <Lottie animationData={mainLoading} />
        </div>
      ) : (
        <>
          <div
            className={`w-full ${
              selectedType === "all"
                ? `bg-slate-100`
                : `${PokemonTypeColor.bg[selectedType]} bg-opacity-60`
            }`}
          >
            <NavBar
              handleTypeSelected={handleTypeSelected}
              selectedType={selectedType}
              pokemons={pokemons}
              search={search}
              handleSearch={handleSearch}
            />
            <PokemonCart
              pokemons={pokemons}
              selectedPokemons={selectedPokemons}
              onSelectPokemon={handleSelectPokemon}
            />
            <NavButtons
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              handleFirst={handleFirst}
              handleLast={handleLast}
              startingIndex={startingIndex}
              pokemons={pokemons}
            />

            <div className="flex justify-center">
              <div className="max-w-4xl px-5">
                <div className="grid gap-5 mx-auto md:grid-cols-4 lg:max-w-none my-10">
                  {Array.from(pokemons.keys())
                    .sort((a, b) => pokemons.get(a).name - pokemons.get(b).name)
                    .filter((pokemon) => {
                      if (selectedType === "all") {
                        return true;
                      }
                      return pokemons
                        .get(pokemon)
                        .types.some((type) => type.type.name === selectedType);
                    })
                    .filter((pokemon) => {
                      if (search === "") {
                        return true;
                      }
                      return pokemons
                        .get(pokemon)
                        .name.toLowerCase()
                        .includes(search.toLowerCase());
                    })
                    .slice(
                      startingIndex,
                      startingIndex + NUMBER_OF_POKEMONS_PER_PAGE
                    )
                    .map((key, index) => (
                      <div key={index} className="group">
                        <button
                          onClick={() => setCurrentPokemon(pokemons.get(key))}
                          className="flex select-none text-center flex-col transform rounded-xl
                    shadow-lg border border-gray-300 overflow-hidden
                    hover:opacity-75 transition-opacity bg-white
                    focus:outline-none focus:shadow-xl duration-200"
                        >
                          <PokemonCard pokemon={pokemons.get(key)} />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Pokemons;
