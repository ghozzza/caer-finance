"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPositionByOwnerAndLpAddress = async (address: string, lpAddress: string) => {
  const position = await prisma.position.findMany({
    where: { owner: address, lpAddress: lpAddress },
  });
  return {
    success: true,
    data: position,
  };
};
