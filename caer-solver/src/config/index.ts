import dotenv from "dotenv";
import { arbitrumSepolia, eduChain, pharos } from "../chains";
import {
  arbitrumContract,
  eduChainContract,
  eduPricefeed,
  pharosContract,
  pharosPricefeed,
  pricefeed,
} from "../contracts";
import { TOKEN_OPTIONS } from "../../constants/tokenOption";
import { mockWeth } from "../../constants/address";

dotenv.config();

export const config = {
  PORT: process.env.PORT ?? 4000,
  WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY as `0x${string}`,
  ARBITRUM_RPC: "https://sepolia-rollup.arbitrum.io/rpc",
  CHAIN: arbitrumSepolia,
  CONTRACTS: {
    arbitrum: arbitrumContract,
    pricefeed,
  },
  TOKENS: {
    options: TOKEN_OPTIONS,
    mockWeth,
  },
};

export const configEduChain = {
  PORT: process.env.PORT ?? 4000,
  WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY as `0x${string}`,
  RPC_URL: "https://rpc.open-campus-codex.gelato.digital",
  CHAIN: eduChain,
  CONTRACTS: {
    eduChain: eduChainContract,
    eduPricefeed,
  },
  TOKENS: {
    options: TOKEN_OPTIONS,
    mockWeth,
  },
};

export const configPharos = {
  PORT: process.env.PORT ?? 4000,
  WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY as `0x${string}`,
  RPC_URL: "https://devnet.dplabs-internal.com/",
  CHAIN: pharos,
  CONTRACTS: {
    pharos: pharosContract,
    pharosPricefeed,
  },
  TOKENS: {
    options: TOKEN_OPTIONS,
    mockWeth,
  },
};
