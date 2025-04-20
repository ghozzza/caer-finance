"use server";
import { factory, priceFeed } from "@/constants/addresses";
import { factoryAbi } from "@/lib/abi/factoryAbi";
import { PrismaClient } from "@prisma/client";
import { createPublicClient } from "viem";
import { http, useReadContract } from "wagmi";
import { arbitrumSepolia, sepolia } from "wagmi/chains";

const prisma = new PrismaClient();

export const createLPFactory = async (
  _sender: string,
  _collateralToken: string,
  _borrowToken: string,
  _ltv: string
) => {
  const sender = _sender;
  const collateralToken = _collateralToken;
  const borrowToken = _borrowToken;
  const ltv = _ltv;

  const lpFactoryCount = await prisma.lP_Factory.count();

  // Check if pool already exists for this sender
  const existingPool = await prisma.lP_Factory.findFirst({
    where: {
      collateralToken: collateralToken,
      borrowToken: borrowToken,
    },
  });

  if (existingPool) {
    return {
      success: false,
      message: "Pool already exists for this configuration",
    };
  }

  // Read pool address from factory contract
  const publicClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(),
  });

  let poolAddress: [string, string, string];
  try {
    poolAddress = (await publicClient.readContract({
      address: factory,
      abi: factoryAbi,
      functionName: "pools",
      args: [BigInt(lpFactoryCount + 4)],
    })) as [string, string, string];
  } catch (error) {
    console.error("Error reading pool address:", error);
    return { success: false, message: "Failed to read pool address" };
  }
  if (!poolAddress) {
    return { success: false, message: "Failed to read pool address" };
  }
  if (collateralToken && borrowToken) {
    // Create LP Factory record with placeholder address
    await prisma.lP_Factory.create({
      data: {
        sender: sender,
        collateralToken: collateralToken,
        borrowToken: borrowToken,
        lpAddress: poolAddress[2],
        ltv: ltv,
        poolIndex: String(lpFactoryCount + 3),
      },
    });
    return { success: true, message: "LP Factory created successfully" };
  }
  return { success: false, message: "Failed to create LP Factory" };
};
