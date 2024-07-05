import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { dashBoardData } from "../../appwrite";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function ProductCategory() {
  const { data } = useQuery({
    queryKey: ["productCat"],
    queryFn: async () => await dashBoardData.getProductBySellAmount(),
  });
  return (
    <div className="flex h-full w-full flex-col items-start justify-between bg-blue-900 px-6 pb-6 pt-6 text-white">
      <div>
        <p className="font-medium">Sales By Product</p>
      </div>
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={800} height={400}>
            <Pie
              data={data}
              cx={"50%"}
              cy={"50%"}
              innerRadius={70}
              outerRadius={120}
              fill="#8884d8"
              stroke={"none"}
              paddingAngle={5}
              dataKey="totalAmount"
            >
              {data &&
                data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                backgroundColor: "lightBlue",
                color: "gray",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="text-start font-medium">
          Breakdown of real states and information via category for revenue mode
          for this year and total saltes
        </p>
      </div>
    </div>
  );
}

export default ProductCategory;
