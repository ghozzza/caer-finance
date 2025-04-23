import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PoolDialogProps {
  isOpen: boolean;
  onClose: () => void;
  collateralToken: string;
  loanToken: string;
  ltv: string;
  liquidity: string;
  rate: string;
}

const PoolDialog = ({
  isOpen,
  onClose,
  collateralToken,
  loanToken,
  ltv,
  liquidity,
  rate,
}: PoolDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 transition-all duration-300">
        <DialogHeader>
          <DialogTitle>Pool Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Image
                  src="/placeholder.png"
                  alt={collateralToken}
                  width={24}
                  height={24}
                />
              </div>
              <span className="font-medium">Collateral: {collateralToken}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Image
                  src="/placeholder.png"
                  alt={loanToken}
                  width={24}
                  height={24}
                />
              </div>
              <span className="font-medium">Loan: {loanToken}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">LTV:</span>
            <span className="text-emerald-600 font-medium">{ltv}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Liquidity:</span>
            <span className="font-medium">{liquidity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rate:</span>
            <span className="text-blue-600 font-medium">{rate}</span>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Borrow</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PoolDialog;
