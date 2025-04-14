import { Request, Response } from "express";
import { Address } from "viem";
import { BlockchainService } from "../services/blockchain.service";
import { BorrowRequest } from "../types";

export class BorrowController {
  static async borrow(req: Request, res: Response): Promise<void> {
    try {
      const { userAddress, amount } = req.body as BorrowRequest;

      if (!userAddress || !amount) {
        res.status(400).json({
          success: false,
          message: "Missing required parameters: userAddress and amount are required",
        });
        return;
      }

      if (!userAddress.startsWith("0x") || userAddress.length !== 42) {
        res.status(400).json({
          success: false,
          message: "Invalid user address format",
        });
        return;
      }

      if (isNaN(Number(amount)) || Number(amount) <= 0) {
        res.status(400).json({
          success: false,
          message: "Amount must be a positive number",
        });
        return;
      }

      const txHash = await BlockchainService.executeBorrow(
        userAddress as Address,
        amount
      );

      res.status(200).json({
        success: true,
        message: "Borrow operation executed successfully",
        data: {
          transactionHash: txHash,
          userAddress: userAddress as Address,
          amount,
        },
      });
    } catch (error: any) {
      console.error("API Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to execute borrow operation",
        error: error.message,
      });
    }
  }
} 