import React, { useEffect } from "react";
import { Person, Calender, All, Doller } from "../../../public/Assets";
import SaleCart from "./MonthlySale Components/SaleCart";
import { dashBoardData } from "../../appwrite/storage";
import { useQuery } from "@tanstack/react-query";

function MonthlySaleData() {
  const {
    data: { customerCount } = "",
    data: { percentage: customerPer } = "",
  } = useQuery({
    queryKey: ["customer"],
    queryFn: async () => await dashBoardData.totalCustomerWithPercentage(),
  });

  const { data: { currentDaySell } = "", data: { percentage: sellPer } = "" } =
    useQuery({
      queryKey: ["currentDaySell"],
      queryFn: async () => await dashBoardData.getSellToday(),
    });

  const {
    data: { currentMonthTotalSell } = "",
    data: { percentage: monthSellPer } = "",
  } = useQuery({
    queryKey: ["monthlySell"],
    queryFn: async () => await dashBoardData.getMonthlySell(),
  });

  const {
    data: { currentYearTotalAmount } = "",
    data: { percentage: yearlySellPer } = "",
  } = useQuery({
    queryKey: ["yearlySell"],
    queryFn: async () => await dashBoardData.getYearlySell(),
  });

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2.5">
      <SaleCart
        Icon={Person}
        cartHeading={"Total Customers"}
        Amount={customerCount}
        Grow={customerPer}
        info={"Since last month"}
      />
      <SaleCart
        Icon={Doller}
        cartHeading={"Sales Today"}
        Amount={currentDaySell}
        Grow={sellPer}
        info={"Since last day"}
      />
      <SaleCart
        Icon={Calender}
        cartHeading={"Monthly Sales"}
        Amount={currentMonthTotalSell}
        Grow={monthSellPer}
        info={"Since last month"}
      />
      <SaleCart
        Icon={All}
        cartHeading={"Yearly Sales"}
        Amount={currentYearTotalAmount}
        Grow={yearlySellPer}
        info={"Since last year"}
      />
    </div>
  );
}

export default MonthlySaleData;
