import { useAccount, useReadContract, http } from "wagmi";
import { poolAbi } from "@/lib/abi/poolAbi";
import { Address, createPublicClient } from "viem";
import { lendingPool } from "@/constants/addresses";
import { arbitrumSepolia } from "wagmi/chains";

export const useReadLendingData = (
  userAddress?: Address,
  tokenAddress?: Address,
  lpAddress?: `0x${string}`
) => {
  const { address } = useAccount();

  const { data: checkAvailability } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "addressPosition",
    args: [address],
  });

  const { data: borrowAddress } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "borrowToken",
  });

  const { data: collateralAddress } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "collateralToken",
  });

  const { data: totalSupplyAssets } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalSupplyAssets",
    args: [],
  });
  const { data: dynamicTotalSupplyAssets } = useReadContract({
    address: lpAddress,
    abi: poolAbi,
    functionName: "totalSupplyAssets",
    args: [],
  });
  const { data: tokenBalanceByPosition } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "getTokenBalancesByPosition",
    args: [tokenAddress],
  });

  const { data: totalBorrowAssets } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalBorrowAssets",
    args: [],
  });
  const { data: totalBorrowShares } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalBorrowShares",
    args: [],
  });
  const { data: totalSupplyShares } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalSupplyShares",
    args: [],
  });

  const { data: userCollateral } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "userCollaterals",
    args: [address],
  });

  const { data: userSupply } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "userSupplyShares",
    args: [address],
  });

  const { data: userBorrow } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "userBorrowShares",
    args: [address],
  });

  const { data: dynamicUserBorrow } = useReadContract({
    address: lpAddress,
    abi: poolAbi,
    functionName: "userBorrowShares",
    args: [address],
  });

  const { data: dynamicUserCollateral } = useReadContract({
    address: lpAddress,
    abi: poolAbi,
    functionName: "userCollaterals",
    args: [address],
  });
  
  return {
    checkAvailability,
    totalSupplyAssets,
    totalSupplyShares,
    collateralAddress,
    borrowAddress,
    userCollateral,
    tokenBalanceByPosition,
    totalBorrowAssets,
    totalBorrowShares,
    userSupply,
    userBorrow,
    dynamicTotalSupplyAssets: dynamicTotalSupplyAssets
      ? Number(dynamicTotalSupplyAssets)
      : "0.00",
    dynamicUserBorrow,
    dynamicUserCollateral,
  };
};

const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
});

export const readLendingData = async (lpAddress: `0x${string}`) => {
  let totalSupplyAssets: BigInt;
  try {
    totalSupplyAssets = (await publicClient.readContract({
      address: lpAddress,
      abi: poolAbi,
      functionName: "totalSupplyAssets",
      args: [],
    })) as BigInt;
  } catch (error) {
    console.error("Error reading totalSupplyAssets:", error);
    return { success: false, message: "Failed to read totalSupplyAssets" };
  }
  return { success: true, message: totalSupplyAssets };
};
