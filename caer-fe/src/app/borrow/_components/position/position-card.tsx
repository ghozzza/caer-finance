"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  ChevronDown,
  Wallet,
  HandCoins,
  TrendingUp,
  CircleDollarSign,
  Plus,
  Loader2,
} from "lucide-react";

import {
  lendingPool,
  mockUsdc,
  mockWbtc,
  mockWeth,
} from "@/constants/addresses";
import type { Address } from "viem";
import { TOKEN_OPTIONS } from "@/constants/tokenOption";
import PositionToken from "./position-token";
import { useWriteContract } from "wagmi";
import { poolAbi } from "@/lib/abi/poolAbi";
import SelectPosition from "./selectPosition";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  getAllLPFactoryData,
  getSelectedLPFactoryByAddress,
} from "@/actions/GetLPFactory";
import CollateralSection from "./CollateralSection";
import { toast } from "sonner";
const PositionCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [positionAddress, setPositionAddress] = useState<string | undefined>(
    undefined
  );
  const [positionLength, setPositionLength] = useState<number>(0);
  const [positionsArray, setPositionsArray] = useState<`0x${string}`[]>([]);
  const [lpData, setLpData] = useState<any[]>([]);
  const [lpAddress, setLpAddress] = useState<string | undefined>(undefined);
  const [collateralToken, setCollateralToken] = useState<string | undefined>(
    mockWeth
  );
  const [dynamicUserCollateral, setDynamicUserCollateral] = useState<
    number | undefined
  >(undefined);
  const [dynamicUserBorrow, setDynamicUserBorrow] = useState<
    number | undefined
  >(undefined);
  const [borrowToken, setBorrowToken] = useState<string | undefined>(mockUsdc);
  const [isLoading, setIsLoading] = useState(false);

  const arrayLocation = positionsArray.indexOf(
    positionAddress as `0x${string}`
  );

  useEffect(() => {
    const fetchLpData = async () => {
      const data = await getAllLPFactoryData();
      setLpData(data);
    };
    fetchLpData();
  }, []);

  useEffect(() => {
    const fetchSelectedLPFactoryByAddress = async () => {
      setIsLoading(true);
      const data = await getSelectedLPFactoryByAddress(
        lpAddress as `0x${string}`
      );
      setCollateralToken(data?.collateralToken);
      setBorrowToken(data?.borrowToken);
      setIsLoading(false);
    };
    fetchSelectedLPFactoryByAddress();
  }, [collateralToken, lpAddress]);

  const findNameToken = (address: string | undefined) => {
    if (!address) return undefined;
    const token = TOKEN_OPTIONS.find(
      (asset) => asset.address === (address as `0x${string}`)
    );
    return token?.name;
  };
  const findLogoToken = (address: Address | undefined) => {
    const token = TOKEN_OPTIONS.find((asset) => asset.address === address);
    return token?.logo;
  };

  const convertRealAmount = (amount: number | undefined, decimal: number) => {
    const realAmount = Number(amount) ? Number(amount) / decimal : 0; // convert to USDC
    return realAmount;
  };
  const {
    isPending: isPositionPending,
    writeContract: createPositionTransaction,
  } = useWriteContract();
  const handleAddPosition = () => {
    createPositionTransaction({
      address: lendingPool,
      abi: poolAbi,
      functionName: "createPosition",
      args: [],
    });
  };
  const getDecimal = (address: string) => {
    const token = TOKEN_OPTIONS.find((asset) => asset.address === address);
    return token?.decimals;
  };

  const formatTitle = () => {
    if (isLoading)
      return (
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-xl duration-500" />
      );
    if (!lpAddress) return "Select position address";
    return `${
      dynamicUserCollateral
        ? dynamicUserCollateral /
          10 ** Number(getDecimal(String(collateralToken)))
        : "0"
    } $${findNameToken(collateralToken)}`;
  };
  const formatCollateralAmount = () => {
    if (isLoading)
      return (
        <div className="flex justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      );
    const amount = dynamicUserCollateral
      ? convertRealAmount(
          dynamicUserCollateral,
          10 ** Number(getDecimal(String(collateralToken)))
        ).toFixed(5)
      : "0";
    return `${amount} $${findNameToken(collateralToken)}`;
  };
  const formatBorrowAmount = () => {
    if (isLoading)
      return (
        <div className="flex justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      );
    const amount = dynamicUserBorrow ?? "0";
    return `${amount} $${findNameToken(borrowToken)}`;
  };
  const formatRate = () => {
    if (isLoading)
      return (
        <div className="flex justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      );
    const rate = dynamicUserBorrow ? "3%" : "0%";
    return `${rate}`;
  };
  return (
    <Card className="bg-white border shadow-sm overflow-hidden cursor-pointer">
      <CardHeader className="pb-2 border-b py-2">
        <div className="flex items-center justify-between">
          <CollateralSection
            lpAddress={lpAddress as string}
            setLpAddress={setLpAddress}
            lpData={lpData}
            findLogoToken={findLogoToken as (address: string) => string}
            findNameToken={findNameToken as (address: string) => string}
            setDynamicUserCollateral={setDynamicUserCollateral}
            setDynamicUserBorrow={setDynamicUserBorrow}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              lpAddress
                ? setIsExpanded(!isExpanded)
                : toast.error("Select position address")
            }
            className="text-white bg-emerald-500 hover:bg-emerald-600 hover:text-white transform transition-all duration-200 cursor-pointer"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex items-center gap-2 ml-7">
          <h1 className="text-2xl text-gray-500"> {formatTitle()}</h1>
        </div>
      </CardHeader>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CardContent className="px-4 md:px-6 pt-4">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 p-4 bg-white border border-blue-100 rounded-lg shadow-sm">
                  <div className="space-y-2 text-center">
                    <div className="text-xs md:text-sm text-blue-600 flex items-center justify-center gap-1 font-medium">
                      <Wallet className="h-3.5 w-3.5 text-blue-600" />
                      Collateral
                    </div>
                    <div className="text-base md:text-lg font-medium text-gray-800">
                      <span className="text-emerald-600">
                        {formatCollateralAmount()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="text-xs md:text-sm text-blue-600 flex items-center justify-center gap-1 font-medium">
                      <HandCoins className="h-3.5 w-3.5 text-rose-500" />
                      Debt
                    </div>
                    <div className="text-base md:text-lg font-medium text-gray-800">
                      <span className="text-emerald-600">
                        {formatBorrowAmount()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="text-xs md:text-sm text-blue-600 flex items-center justify-center gap-1 font-medium">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                      Rate
                    </div>
                    <div className="text-base md:text-lg font-medium text-emerald-600">
                      {formatRate()}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-blue-100 shadow-sm">
                  {positionAddress === undefined ? (
                    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center bg-white">
                      <div className="bg-blue-100 p-4 rounded-full">
                        <Wallet className="h-10 w-10 text-blue-600" />
                      </div>
                      <span className="text-xl md:text-2xl text-gray-800">
                        {positionLength === 0
                          ? "No positions available"
                          : "Select position address"}
                      </span>
                      <p className="text-sm text-gray-500 max-w-md">
                        {positionLength === 0
                          ? "You don't have any active positions. Start by supplying collateral and borrowing assets."
                          : "Select a position address to view your position."}
                      </p>
                      {positionLength === 0 && (
                        <Button
                          className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
                          onClick={() =>
                            dynamicUserCollateral
                              ? handleAddPosition
                              : toast.error("You don't have any collateral")
                          }
                        >
                          Create Position
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-3 gap-2 p-3 text-sm font-medium text-blue-700 bg-blue-50">
                        <div className="pl-4">Assets</div>
                        <div className="text-center">Value</div>
                        <div className="text-center">Actions</div>
                      </div>
                      <div className="divide-y divide-blue-100">
                        {/* WETH */}
                        <PositionToken
                          name={findNameToken(mockWeth)}
                          address={mockWeth}
                          decimal={1e18}
                          addressPosition={positionAddress as `0x${string}`}
                          arrayLocation={BigInt(arrayLocation)}
                        />
                        {/* WBTC */}
                        <PositionToken
                          name={findNameToken(mockWbtc)}
                          address={mockWbtc}
                          decimal={1e8}
                          addressPosition={positionAddress as `0x${string}`}
                          arrayLocation={BigInt(arrayLocation)}
                        />
                        {/* USDC */}
                        <PositionToken
                          name={findNameToken(mockUsdc)}
                          address={mockUsdc}
                          decimal={1e6}
                          addressPosition={positionAddress as `0x${string}`}
                          arrayLocation={BigInt(arrayLocation)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default PositionCard;
