import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { pharosChain } from "./data/chain-data";

export const config = getDefaultConfig({
  appName: "MyDApp",
  projectId: "YOUR_PROJECT_ID",
  chains: [pharosChain],
  transports: {
    [pharosChain.id]: http(),
  },
});
