import { Card } from "@/components/ui/card";
import React from "react";
import PoolHeader from "./pool-header";
import PoolFooter from "./pool-footer";
import PoolData from "./pool-data";
import PoolList from "./PoolList";
const PoolCard = () => {
  return (
    <Card className="bg-[#F0F2FF] shadow-xl border overflow-hidden">
      <PoolHeader />
      {/* <PoolData /> */}
      {/* <PoolFooter /> */}
      <PoolList />
    </Card>
  );
};

export default PoolCard;
