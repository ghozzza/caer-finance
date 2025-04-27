import { createPublicClient } from "viem";
import { http } from "wagmi";
import { arbitrumSepolia, pharosChain } from "./data/chain-data";

export const ArbPublicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
}); 

export const publicClient = createPublicClient({
  chain: pharosChain,
  transport: http(),
});
