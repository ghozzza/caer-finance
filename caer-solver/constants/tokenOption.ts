import { mockWbtc, mockWeth, mockUsdc } from "./address";

export interface TokenOption {
  name: string;
  namePrice: string;
  address: string;
  decimals: number;
}

export const TOKEN_OPTIONS: TokenOption[] = [
  {
    name: "WETH",
    namePrice: "ETH",
    address: mockWeth,
    decimals: 18,
  },
  {
    name: "WBTC",
    namePrice: "BTC",
    address: mockWbtc,
    decimals: 8,
  },
  {
    name: "USDC",
    namePrice: "USDC",
    address: mockUsdc,
    decimals: 6,
  },
  {
    name: "USDT",
    namePrice: "USDT",
    address: mockUsdc,
    decimals: 6,
  },
];
