"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PoolDialog from "./PoolDialog";

const PoolList = () => {
  const [selectedPool, setSelectedPool] = useState<{
    collateralToken: string;
    loanToken: string;
    ltv: string;
    liquidity: string;
    rate: string;
  } | null>(null);

  const handleRowClick = (pool: {
    collateralToken: string;
    loanToken: string;
    ltv: string;
    liquidity: string;
    rate: string;
  }) => {
    setSelectedPool(pool);
  };

  return (
    <div className="px-6 pb-6">
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-slate-100 px-6 py-3">
          <div className="grid grid-cols-5 gap-4 items-center text-center">
            <div className="text-sm font-medium text-gray-600">Collateral</div>
            <div className="text-sm font-medium text-gray-600">Loan</div>
            <div className="text-sm font-medium text-gray-600">LTV</div>
            <div className="text-sm font-medium text-gray-600">Liquidity</div>
            <div className="text-sm font-medium text-gray-600">Rate</div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {/* row 1 */}
          <div 
            className="px-6 py-4 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            onClick={() => handleRowClick({
              collateralToken: "WETH",
              loanToken: "USDC",
              ltv: "75%",
              liquidity: "800K",
              rate: "4.2%"
            })}
          >
            <div className="grid grid-cols-5 gap-4 items-center justify-center text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Image
                    src="/placeholder.png"
                    alt="WETH"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="font-medium text-gray-900">WETH</div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Image
                    src="/placeholder.png"
                    alt="USDC"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="font-medium text-gray-900">USDC</div>
              </div>
              <div className="text-emerald-600">75%</div>
              <div className="text-gray-900">800K</div>
              <div className="text-blue-600">4.2%</div>
            </div>
          </div>
          {/* row 2 */}
          <div 
            className="px-6 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleRowClick({
              collateralToken: "WETH",
              loanToken: "USDC",
              ltv: "75%",
              liquidity: "800K",
              rate: "4.2%"
            })}
          >
            <div className="grid grid-cols-5 gap-4 items-center justify-center text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Image
                    src="/placeholder.png"
                    alt="WETH"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="font-medium text-gray-900">WETH</div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Image
                    src="/placeholder.png"
                    alt="USDC"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="font-medium text-gray-900">USDC</div>
              </div>
              <div className="text-emerald-600">75%</div>
              <div className="text-gray-900">800K</div>
              <div className="text-blue-600">4.2%</div>
            </div>
          </div>
        </div>
      </div>

      {selectedPool && (
        <PoolDialog
          isOpen={!!selectedPool}
          onClose={() => setSelectedPool(null)}
          {...selectedPool}
        />
      )}
    </div>
  );
};

export default PoolList;
