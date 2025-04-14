import { Request, Response } from "express";
import { PriceFeedService } from "../services/pricefeed.service";
import { TOKEN_OPTIONS } from "../../constants/tokenOption";
import { mockWeth } from "../../constants/address";

export class PriceFeedController {
  static async getPriceFeed(req: Request, res: Response): Promise<void> {
    try {
      const token = TOKEN_OPTIONS.find(
        (token) => token.address === mockWeth
      );

      if (!token) {
        res.status(404).json({
          success: false,
          message: "Token not found in configuration",
        });
        return;
      }

      const price = await PriceFeedService.fetchPrice(token.namePrice);
      res.status(200).json({
        success: true,
        message: "Price feed retrieved successfully",
        data: {
          token: token.namePrice,
          price: price,
        },
      });
    } catch (error: any) {
      console.error("Error fetching price feed:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch price feed",
        error: error.message,
      });
    }
  }
} 