import { useEffect, useState } from "react";
const PokemonCart = ({ pokemons, selectedPokemons, onSelectPokemon }) => {
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    if (selectedPokemons.length === 0) {
      setShowDetail(false);
    }
  }, [selectedPokemons]);

  return (
    <>
      {selectedPokemons.length > 0 && (
        <nav className="flex flex-col justify-center fixed bottom-[100px] mx-auto inset-x-0 max-w-[20rem] bg-transparent z-10">
          {/* details on selected pokemons; animate from bottom up when the button is clicked */}
          {showDetail && (
            <div className="mb-5">
              <div
                className={`flex flex-col bg-gray-200 rounded-lg shadow-sm shadow-grey-500 transition-all opacity-100 shadow-gray-500
              }`}
              >
                {selectedPokemons.map((pokemon) => (
                  <div className="flex flex-row justify-between items-center p-2">
                    <div className="flex flex-row items-center">
                      <img
                        className="w-10 object-cover pointer-events-none"
                        src={pokemon.image}
                        alt={pokemon.name}
                      />
                      <p className="ml-2">{pokemon.name}</p>
                    </div>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => onSelectPokemon(pokemon)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* circular button */}
          <div className="flex justify-center">
            <button
              className="bg-sky-400 hover:bg-sky-200 text-white font-bold w-10 h-10 rounded-full shadow-lg shadow-gray-500"
              onClick={() => setShowDetail(!showDetail)}
            >
              {selectedPokemons.length}
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default PokemonCart;
