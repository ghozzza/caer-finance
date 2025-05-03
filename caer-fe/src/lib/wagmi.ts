import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { pharosChain } from "./data/chain-data";
import { optimismSepolia } from "viem/chains";

export const config = getDefaultConfig({
  appName: "MyDApp",
  projectId: "YOUR_PROJECT_ID",
  chains: [pharosChain, optimismSepolia],
  transports: {
    [pharosChain.id]: http(),
    [optimismSepolia.id]: http(),
  },
});
