import { Request, Response } from "express";
import { PriceFeedService } from "../services/pricefeed.service";
import { TOKEN_OPTIONS } from "../../constants/tokenOption";
import { mockUsdc, mockWbtc, mockWeth } from "../../constants/address";

export const getPriceFeed = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = TOKEN_OPTIONS.find((token) => token.address === mockWeth);
    const token2 = TOKEN_OPTIONS.find((token) => token.address === mockWbtc);
    const token3 = TOKEN_OPTIONS.find((token) => token.address === mockUsdc);

    if (!token) {
      res.status(404).json({
        success: false,
        message: "Token not found in configuration",
      });
      return;
    }

    const price = await PriceFeedService.fetchPrice(token.namePrice);
    const price2 = await PriceFeedService.fetchPrice(
      token2?.namePrice as string
    );
    const price3 = await PriceFeedService.fetchPrice(
      token3?.namePrice as string
    );
    res.status(200).json({
      success: true,
      message: "Price feed retrieved successfully",
      data: {
        token: token.namePrice,
        price: price,
        token2: token2?.namePrice,
        price2: price2,
        token3: token3?.namePrice,
        price3: price3,
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
};
