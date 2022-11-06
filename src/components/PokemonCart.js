import { useEffect, useState } from "react";
import { mintNFT } from "../functions/mintNFT";
import { useNavigate } from "react-router-dom";
import { useAddress } from "@thirdweb-dev/react";
const PokemonCart = ({ pokemons, selectedPokemons, onSelectPokemon }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const address = useAddress();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPokemons.length === 0) {
      setShowDetail(false);
    }
  }, [selectedPokemons]);

  const mint = async () => {
    setMinting(true);
    for (let i = 0; i < selectedPokemons.length; i++) {
      const pokemon = selectedPokemons[i];
      await mintNFT(pokemon, address);
    }
    setMinting(false);
    setMinted(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setMinted(false);
    navigate("/collections");
  };

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
                {!minted &&
                  selectedPokemons.map((pokemon, index) => (
                    <div
                      className="flex flex-row justify-between items-center p-2"
                      key={pokemon.id}
                    >
                      <div className="flex flex-row items-center">
                        <img
                          className="w-10 object-cover pointer-events-none"
                          src={pokemon.image}
                          alt={pokemon.name}
                          // display a default image when loading

                          style={{
                            background: `transparent url(http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif) center no repeat`,
                          }}
                        />
                        <p className="ml-2">{pokemon.name}</p>
                      </div>
                      <button
                        className={`text-white font-bold py-2 px-4 rounded disabled:bg-red-300 ${
                          minting
                            ? "bg-orange-400"
                            : "bg-red-500 hover:bg-red-700"
                        }`}
                        onClick={() => onSelectPokemon(pokemon)}
                        disabled={minting}
                      >
                        {minting ? "Pending" : "Remove"}
                      </button>
                    </div>
                  ))}
                {/* text box to enter a name and a button to add to collection */}
                <div className="flex flex-row justify-between items-center p-2">
                  {address ? (
                    <button
                      className={`w-full text-white font-bold py-2 px-4 rounded ${
                        minting
                          ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-x"
                          : minted
                          ? "bg-green-500"
                          : "bg-blue-500 hover:bg-blue-700"
                      }`}
                      disabled={minting || minted}
                      onClick={mint}
                    >
                      {minting ? "Minting..." : minted ? "Done!" : "Mint"}
                    </button>
                  ) : (
                    <button
                      className="w-full bg-orange-300 text-slate-800 font-bold py-2 px-4 rounded "
                      disabled
                    >
                      Connect your wallet to mint NFTs!
                    </button>
                  )}
                </div>
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
