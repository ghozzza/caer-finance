import { Address, createWalletClient, http, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { config } from "../config";
import { arbitrumAbi } from "../arbitrumAbi";
import { pricefeedAbi } from "../../abi/pricefeed";

const arbitrumClient = createWalletClient({
  chain: config.CHAIN,
  transport: http(config.ARBITRUM_RPC),
  account: privateKeyToAccount(config.WALLET_PRIVATE_KEY),
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
      const tx = await arbitrumClient.writeContract({
        address: config.CONTRACTS.arbitrum as `0x${string}`,
        abi: arbitrumAbi,
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
      const tx = await arbitrumClient.writeContract({
        address: config.CONTRACTS.pricefeed as `0x${string}`,
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