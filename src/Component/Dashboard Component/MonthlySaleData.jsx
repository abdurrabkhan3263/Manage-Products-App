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
      queryKey: [""],
      queryFn: async () => await dashBoardData.getSellToday(),
    });

  const {
    data: { currentMonthTotalSell } = "",
    data: { percentage: monthSellPer } = "",
  } = useQuery({
    queryKey: [""],
    queryFn: async () => await dashBoardData.getMonthlySell(),
  });

  const {
    data: { currentYearTotalAmount } = "",
    data: { percentage: yearlySellPer } = "",
  } = useQuery({
    queryKey: [""],
    queryFn: async () => await dashBoardData.getYearlySell(),
  });

  useEffect(() => {
    console.log(currentMonthTotalSell, monthSellPer);
    console.log(currentYearTotalAmount, yearlySellPer);
  }, [
    currentMonthTotalSell,
    currentYearTotalAmount,
    monthSellPer,
    yearlySellPer,
  ]);

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2.5">
      <SaleCart
        Icon={Person}
        cartHeading={"Total Customers"}
        Amount={customerCount}
        Grow={customerPer}
      />
      <SaleCart
        Icon={Doller}
        cartHeading={"Sales Today"}
        Amount={currentDaySell}
        Grow={sellPer}
      />
      <SaleCart
        Icon={Calender}
        cartHeading={"Monthly Sales"}
        Amount={currentMonthTotalSell}
        Grow={monthSellPer}
      />
      <SaleCart
        Icon={All}
        cartHeading={"Yearly Sales"}
        Amount={currentYearTotalAmount}
        Grow={yearlySellPer}
      />
    </div>
  );
}

export default MonthlySaleData;
