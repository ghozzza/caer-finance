import dotenv from "dotenv";
import { arbitrumSepolia } from "../chains";
import { arbitrumContract, pricefeed } from "../contracts";
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