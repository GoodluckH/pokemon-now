import PokemonTypeColor from "../PokemonTypeColor";

const PokemonDetail = ({
  pokemon,
  isOpen,
  onClose,
  onSelectPokemon,
  selectedPokemons,
}) => {
  return (
    <>
      {isOpen && (
        <div className={`fixed inset-0 z-30 overflow-y-auto`}>
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
                      className="leading-12 text-gray-900 font-black font-sans text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
                      id="modal-headline"
                    >
                      {pokemon.name}
                    </p>
                    <div className="mt-2 select-none">
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
                <button
                  type="button"
                  className="inline-flex font-bold justify-center w-full px-4 py-2 text-base text-white bg-gradient-to-r from-pink-400 to-yellow-500 hover:from-green-500 hover:to-blue-500  rounded-md shadow-lg shadow-grey-300 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => onSelectPokemon(pokemon)}
                >
                  {selectedPokemons.find((p) => p.id === pokemon.id) ? (
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Added
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add
                    </span>
                  )}
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
