"use server";

import { PrismaClient } from "@prisma/client";
import { createPublicClient } from "viem";
import { http } from "wagmi";
import { pharosChain } from "@/lib/data/chain-data";
import { poolAbi } from "@/lib/abi/poolAbi";

const prisma = new PrismaClient();

const publicClient = createPublicClient({
  chain: pharosChain,
  transport: http(),
});

export const createPosition = async (
  collateralToken: string,
  borrowToken: string,
  poolIndex: string,
  lpAddress: string,
  owner: string
) => {
  const positionCount = await prisma.position.count({
    where: {
      owner: owner,
      lpAddress: lpAddress,
    },
  });

  const positionIndex = positionCount !== 0 ? positionCount : 0;
  let positionAddress;
  try {
    positionAddress = await publicClient.readContract({
      address: lpAddress as `0x${string}`,
      abi: poolAbi,
      functionName: "addressPositions",
      args: [owner, positionIndex],
    });
  } catch (error) {
    console.error("Error creating position:", error);
    return {
      success: false,
      message: "Position creation failed0",
    };
  }

  if (!positionAddress) {
    return {
      success: false,
      message: "Position creation failed1",
    };
  }

  const position = await prisma.position.create({
    data: {
      collateralToken: collateralToken,
      borrowToken: borrowToken,
      poolIndex: poolIndex,
      positionIndex: String(positionIndex),
      lpAddress: lpAddress,
      positionAddress: positionAddress as `0x${string}`,
      owner: owner,
    },
  });

  if (!position) {
    return {
      success: false,
      message: "Position creation failed2",
    };
  }
  return {
    success: true,
    message: "Position created successfully",
  };
};
