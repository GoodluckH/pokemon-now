// my_script.js
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import pokemon from "pokemontcgsdk";

// Learn more about securely accessing your private key: https://portal.thirdweb.com/web3-sdk/set-up-the-sdk/securing-your-private-key
const privateKey = process.env.REACT_APP_PRIVATE_KEY;

// instantiate the SDK based on your private key, with the desired chain to connect to
const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "mumbai");

// set up pokemon api
const apiKey = process.env.REACT_APP_POKEMON_TCG_API_KEY;
pokemon.configure({ apiKey });
// // deploy existing contracts, or your own using the thirdweb CLI
// const deployedAddress = sdk.deployer.deployNFTCollection({
//   name: "My NFT Collection",
//   primary_sale_recipient: "0x...",
// });

// // access your deployed contracts
// const contract = await sdk.getContract(deployedAddress);

// // Or execute transactions using the extensions API
// await contract.erc721.mint({
//   name: "Cool NFT",
//   description: "Minted NFT from code!",
//   image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
// });

export async function getPokemonNFTs(address) {
  const contracts = await sdk.getContractList(address);

  const pokemonNFTs = contracts.filter(
    (contract) => contract.contractType === "nft-drop"
  );

  for (const nft of pokemonNFTs) {
    try {
      console.log(nft);
      const meta = await nft.metadata();
      const image = meta.image;
      const symbol = meta.symbol;
      nft.image = image;
      nft.symbol = symbol;
      nft.description = meta.description;
      console.log(nft);
    } catch (e) {
      console.log(e);
    }
  }

  return pokemonNFTs;
}

// export async function mintNFTs(pokemons, address) {
//   for (const pokemon of pokemons) {
//     const pokemonImage = await getPokemonImage(pokemon.name);
//     console.log("pokemonImage", pokemonImage);
//     const pokemonName = pokemon.name;
//     const pokemonDescription = pokemon.types;
//     await sdk.deployer.deployNFTDrop({
//       name: pokemonName,
//       description: pokemonDescription,
//       image: pokemonImage,
//       primary_sale_recipient: address,
//       symbol: "pokemon",
//     });
//   }
// }

export async function mintNFT(pokemon, address) {
  try {
    const pokemonImage = await getPokemonImage(pokemon.name);
    //   console.log("pokemonImage", pokemonImage);
    const pokemonName = pokemon.name;
    const pokemonDescription = pokemon.types[0].type.name;
    //   console.log(pokemonDescription);
    await sdk.deployer.deployNFTDrop({
      name: pokemonName,
      description: pokemonDescription,
      image: pokemonImage,
      primary_sale_recipient: address,
      symbol: "pokemon",
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getPokemonImage(pokemonName) {
  console.log("57. getPokemonImage", pokemonName);
  const pokemonCard = await pokemon.card.where({ q: `name:${pokemonName}` });
  console.log("59. pokemonCard", pokemonCard);
  return pokemonCard.data[0].images.large ?? pokemonCard[0].images.small ?? "";
}
