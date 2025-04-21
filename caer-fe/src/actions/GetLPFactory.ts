"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all lp factory data
export const getAllLPFactoryData = async () => {
  const data = await prisma.lP_Factory.findMany();
  return data;
};
export const getSelectedLPFactory = async (address: string) => {
  if (address) {
  const data = await prisma.lP_Factory.findFirst({
    where: {
      sender: address,
    },
  });
    return data;
  } else {
    return null;
  }
};
export const getLPFactoryCount = async () => {
  const count = await prisma.lP_Factory.count();
  return count;
};
