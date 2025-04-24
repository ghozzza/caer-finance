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

  const { data: checkAvailability, refetch: refetchCheckAvailability } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "addressPosition",
    args: [address],
  });

  const { data: borrowAddress, refetch: refetchBorrowAddress } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "borrowToken",
  });

  const { data: collateralAddress, refetch: refetchCollateralAddress } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "collateralToken",
  });

  const { data: totalSupplyAssets, refetch: refetchTotalSupplyAssets } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalSupplyAssets",
    args: [],
  });

  const { data: dynamicTotalSupplyAssets, refetch: refetchDynamicTotalSupplyAssets } = useReadContract({
    address: lpAddress,
    abi: poolAbi,
    functionName: "totalSupplyAssets",
    args: [],
  });

  const { data: tokenBalanceByPosition, refetch: refetchTokenBalanceByPosition } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "getTokenBalancesByPosition",
    args: [tokenAddress],
  });

  const { data: totalBorrowAssets, refetch: refetchTotalBorrowAssets } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalBorrowAssets",
    args: [],
  });

  const { data: totalBorrowShares, refetch: refetchTotalBorrowShares } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalBorrowShares",
    args: [],
  });

  const { data: totalSupplyShares, refetch: refetchTotalSupplyShares } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalSupplyShares",
    args: [],
  });

  const { data: userCollateral, refetch: refetchUserCollateral } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "userCollaterals",
    args: [address],
  });

  const { data: userSupply, refetch: refetchUserSupply } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "userSupplyShares",
    args: [address],
  });

  const { data: userBorrow, refetch: refetchUserBorrow } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "userBorrowShares",
    args: [address],
  });

  const { data: dynamicUserBorrow, refetch: refetchDynamicUserBorrow } = useReadContract({
    address: lpAddress,
    abi: poolAbi,
    functionName: "userBorrowShares",
    args: [address],
  });

  const { data: dynamicUserCollateral, refetch: refetchDynamicUserCollateral } = useReadContract({
    address: lpAddress,
    abi: poolAbi,
    functionName: "userCollaterals",
    args: [address],
  });

  const refetchAll = async () => {
    await Promise.all([
      refetchCheckAvailability(),
      refetchBorrowAddress(),
      refetchCollateralAddress(),
      refetchTotalSupplyAssets(),
      refetchDynamicTotalSupplyAssets(),
      refetchTokenBalanceByPosition(),
      refetchTotalBorrowAssets(),
      refetchTotalBorrowShares(),
      refetchTotalSupplyShares(),
      refetchUserCollateral(),
      refetchUserSupply(),
      refetchUserBorrow(),
      refetchDynamicUserBorrow(),
      refetchDynamicUserCollateral(),
    ]);
  };
  
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
    refetchAll,
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
