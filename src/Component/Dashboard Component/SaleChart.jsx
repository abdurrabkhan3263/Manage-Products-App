import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dashBoardData } from "../../appwrite";

function SaleChart({ sellData }) {
  const CustomDot = (props) => {
    const { cx, cy, value } = props;
    const strokeColor = value >= 2000 ? "rgb(254 240 138)" : "rgb(254 240 138)";
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        stroke={strokeColor}
        fill="none"
        strokeWidth={1}
      />
    );
  };

  return (
    <div className="flex h-full w-full items-end overflow-hidden bg-blue-900">
      <div className="flex h-full w-full flex-col items-center justify-center px-4 py-4">
        <ResponsiveContainer width="100%" height={"95%"}>
          <AreaChart
            data={sellData || []}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="month"
              tick={{
                fill: "rgb(254 240 138)",
                fontWeight: 500,
                fontSize: "14px",
              }}
              axisLine={{ stroke: "rgb(254 240 138)" }}
              tickLine={{ stroke: "rgb(254 240 138)" }}
              strokeWidth={1}
            />
            <YAxis
              tick={{
                fill: "rgb(254 240 138)",
                fontWeight: 500,
                fontSize: "14px",
              }}
              axisLine={{ stroke: "rgb(254 240 138)" }}
              tickLine={{ stroke: "rgb(254 240 138)s" }}
              strokeWidth={1}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "red",
                color: "white",
                border: 1,
                borderRadius: "8px",
              }}
              cursor={{ stroke: "#F0D55D" }}
            />
            <Area
              type="monotone"
              dataKey="Amount"
              stroke="rgb(254 240 138)"
              fill="#F0D55D"
              dot={<CustomDot />}
              strokeWidth={1}
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SaleChart;
