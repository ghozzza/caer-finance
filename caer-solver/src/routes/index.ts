import express from "express";
import { BorrowController } from "../controllers/borrow.controller";
import { PriceFeedController } from "../controllers/pricefeed.controller";

const router = express.Router();

// Borrow routes
router.post("/api/borrow", BorrowController.borrow);

// Price feed routes
router.get("/send-target-reports", PriceFeedController.getPriceFeed);

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default router; 