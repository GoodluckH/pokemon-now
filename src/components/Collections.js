import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import Lottie from "lottie-react";
import emptyLoader from "./empty.json";
import pokeBall from "./pokeball-loading.json";
import Hover from "react-3d-hover";
import PokemonTypeColor from "../PokemonTypeColor";
import { getPokemonNFTs } from "../functions/mintNFT";

const Collections = (props) => {
  const walletAddress = useAddress();
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    if (walletAddress) {
      setLoading(true);
      getPokemonNFTs(walletAddress).then((nfts) => {
        setNfts(nfts);
        setLoading(false);
      });
    }
  }, [walletAddress]);

  return (
    <>
      {walletAddress ? (
        <>{loading ? <FetchingNFTs /> : <DisplayCollections nfts={nfts} />}</>
      ) : (
        <WalletNotConnected />
      )}
    </>
  );
};

function DisplayCollections(props) {
  const { nfts } = props;
  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-800 mt-[5rem]">
      <div className="grid grid-cols-3 gap-10 mb-[10rem]">
        {nfts.map((nft, index) => (
          <div
            key={index}
            className="hover:z-50 hover:cursor-pointer"
            onClick={() => {
              window.open(
                `https://mumbai.polygonscan.com/address/${
                  nft.address
                }${"#code"}`,
                "_blank"
              );
            }}
          >
            <Hover
              style={{
                margin: "10 auto",
                cursor: "pointer",
              }}
              scale={1.7}
              perspective={900}
              speed={500}
            >
              <img
                src={nft.image}
                alt={nft.name}
                className={`w-60 shadow-lg ${
                  PokemonTypeColor.shadow[nft.description]
                } rounded-xl`}
              />
            </Hover>
          </div>
        ))}
      </div>
    </div>
  );
}

function FetchingNFTs() {
  return (
    <div className="flex flex-col justify-center items-center h-5/6">
      <div className="w-20 mx-10">
        <Lottie animationData={pokeBall} />
      </div>
      <p className="text-2xl text-white m-10">Fetching NFTs...</p>
    </div>
  );
}

function WalletNotConnected() {
  return (
    // center horizontally and vertically
    <div className="flex flex-col justify-center items-center h-3/4">
      <Lottie animationData={emptyLoader} />

      <p className="text-2xl text-white m-10">
        Connect your wallet to see your collections
      </p>
    </div>
  );
}

export default Collections;
