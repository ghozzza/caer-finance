import { Address, createWalletClient, http, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { config, configEduChain, configPharos } from "../config";
import { lendingPoolAbi } from "../../abi/lendingPoolAbi";
import { pricefeedAbi } from "../../abi/pricefeedAbi";

const arbitrumClient = createWalletClient({
  chain: config.CHAIN,
  transport: http(config.ARBITRUM_RPC),
  account: privateKeyToAccount(config.WALLET_PRIVATE_KEY),
});

const eduChainClient = createWalletClient({
  chain: configEduChain.CHAIN,
  transport: http(configEduChain.RPC_URL),
  account: privateKeyToAccount(configEduChain.WALLET_PRIVATE_KEY),
});

const pharosClient = createWalletClient({
  chain: configPharos.CHAIN,
  transport: http(configPharos.RPC_URL),
  account: privateKeyToAccount(configPharos.WALLET_PRIVATE_KEY),
});

export class BlockchainService {
  static async executeBorrow(
    user: Address,
    amount: string
  ): Promise<`0x${string}`> {
    console.log(
      `🔹 Executing borrow for ${user} on Ca Chain with ${amount} USDC`
    );

    try {
      const amountParsed = parseUnits(amount, 6);
      const tx = await pharosClient.writeContract({
        address: configPharos.CONTRACTS.pharos as `0x${string}`,
        abi: lendingPoolAbi,
        functionName: "borrowBySequencer",
        args: [amountParsed, user],
      });

      console.log(`✅ Borrow transaction executed: ${tx}`);
      return tx;
    } catch (error) {
      console.error("❌ Borrow execution failed:", error);
      throw error;
    }
  }

  static async updatePriceFeed(
    tokenName: string,
    tokenAddress: string,
    price: number,
    decimals: number
  ): Promise<`0x${string}`> {
    try {
      console.log(
        `🔹 Updating price feed for ${tokenName} on Pharos with ${price} ${tokenName}/USD`
      );
      const tx = await pharosClient.writeContract({
        address: configPharos.CONTRACTS.pharosPricefeed as `0x${string}`,
        abi: pricefeedAbi,
        functionName: "addPriceManual",
        args: [`${tokenName}/USD`, tokenAddress, price * 10 ** 8, decimals],
      });

      console.log("✅ Price added successfully");
      return tx;
    } catch (error) {
      console.error("❌ Price update failed:", error);
      throw error;
    }
  }
} 