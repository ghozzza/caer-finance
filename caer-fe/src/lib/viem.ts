import { createPublicClient } from "viem";
import { http } from "wagmi";
import { pharosChain } from "./data/chain-data";
import { arbitrumSepolia } from "viem/chains";

export const ArbPublicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
});

export const publicClient = createPublicClient({
  chain: pharosChain,
  transport: http(),
});
