import { createPublicClient, http } from "viem";
import { arbitrumSepolia } from "wagmi/chains";

export const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
}); 