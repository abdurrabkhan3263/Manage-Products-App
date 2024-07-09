import React, { useEffect } from "react";
import { Person, Calender, All, Doller } from "../../../public/Assets";
import SaleCart from "./MonthlySale Components/SaleCart";
import { dashBoardData } from "../../appwrite/storage";
import { useQuery } from "@tanstack/react-query";

function MonthlySaleData({
  totalCustomer,
  yearlySell,
  sellToday,
  monthlySell,
}) {
  return (
    <div className="grid h-full w-full grid-cols-1 grid-rows-4 gap-2.5 sm:grid-cols-2 sm:grid-rows-2">
      {totalCustomer && (
        <SaleCart
          Icon={Person}
          cartHeading={"Total Customers"}
          Amount={totalCustomer?.customerCount}
          Grow={totalCustomer?.percentage}
          info={"Since last month"}
        />
      )}
      {sellToday && (
        <SaleCart
          Icon={Doller}
          cartHeading={"Sales Today"}
          Amount={sellToday?.currentDaySell}
          Grow={sellToday?.percentage}
          info={"Since last day"}
        />
      )}
      {monthlySell && (
        <SaleCart
          Icon={Calender}
          cartHeading={"Monthly Sales"}
          Amount={monthlySell?.currentMonthTotalSell}
          Grow={monthlySell?.percentage}
          info={"Since last month"}
        />
      )}
      {monthlySell && (
        <SaleCart
          Icon={All}
          cartHeading={"Yearly Sales"}
          Amount={yearlySell?.currentYearTotalAmount}
          Grow={yearlySell?.percentage}
          info={"Since last year"}
        />
      )}
    </div>
  );
}

export default MonthlySaleData;
