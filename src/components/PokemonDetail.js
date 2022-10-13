import { useEffect, useState } from "react";
import PokemonTypeColor from "../PokemonTypeColor";

const PokemonDetail = ({ pokemon, isOpen, onClose }) => {
  // const [pokemonData, setPokemonData] = useState();
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   if (pokemon) {
  //     setLoading(true);
  //     fetch(pokemon.url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setPokemonData(data);
  //         setLoading(false);
  //       });
  //   }
  // }, [pokemon]);
  return (
    <>
      {isOpen && (
        <div className={`fixed inset-0 z-10 overflow-y-auto`}>
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={onClose}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {/* name and image and types of the pokemon */}
                  <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left">
                    <p
                      className="leading-12 text-gray-900 font-black font-sans text-4xl  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
                      id="modal-headline"
                    >
                      {pokemon.name}
                    </p>
                    <div className="mt-2 select-none">
                      {loading ? (
                        <div className="spinner-border" role="status">
                          <span>Loading...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <img
                            className="w-40 object-cover pointer-events-none"
                            src={pokemon.image}
                            alt={pokemon.name}
                          />
                          <div className="mt-2">
                            {pokemon.types.map((type, index) => (
                              <span
                                key={index}
                                className={`inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-full text-s 
                                font-medium 
                                ${PokemonTypeColor.text[type.type.name]}
                                ${PokemonTypeColor.bg[type.type.name]}`}
                              >
                                {type.type.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* stats */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-10 sm:text-left">
                    <p
                      className="leading-12 text-gray-900 font-black font-sans text-4xl"
                      id="modal-headline"
                    >
                      stats
                    </p>
                    <div className="mt-9 select-none">
                      {loading ? (
                        <div className="spinner-border" role="status">
                          <span>Loading...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="">
                            {pokemon.stats.map((stat, index) => (
                              <p
                                key={index}
                                className=" items-center px-2.5 text-lg font-medium bg-gray-100 text-gray-800"
                              >
                                {stat.stat.name} : {stat.base_stat}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Footer to close the dialog */}
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonDetail;
