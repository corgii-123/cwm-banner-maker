import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig, } from "@nfteyez/sol-rayz";
import axios from "axios";

//create a connection of devnet
export const createConnection = () => {
  return new Connection(clusterApiUrl("mainnet-beta"));
};

//check solana on window. This is useful to fetch address of your wallet.
export const getProvider = () => {
  if ("solana" in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
};

//Function to get all NFT information.
//get NFT
export const getAllNftData = async () => {
  try {
    const connect = createConnectionConfig(clusterApiUrl("mainnet-beta"));
    const provider = getProvider();
    await provider.connect()
    console.log(provider);
    let ownerToken = provider.publicKey;
    const result = isValidSolanaAddress(ownerToken);
    console.log("result", result);
    const nfts = await getParsedNftAccountsByOwner({
      publicAddress: ownerToken,
      connection: connect,
      serialization: true,
    });
    return nfts;
  } catch (error) {
    console.log(error);
  }
};

//Function to get all nft data
export const getNftTokenData = async (nftData) => {
  try {
    const tokenData = []
    for (let raw of nftData) {
      const res = await axios.get(raw.data.uri)
      tokenData.push(res)
    }
    return tokenData
  } catch (error) {
    console.log(error);
  }
};