import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomAreaChart = ({ goldData, width }) => {
  // console.log(goldData);

  if (!goldData || goldData.length === 0) {
    return <div>در حال بارگزاری ...</div>;
  }

  const goldDataview = goldData.map((item, index) => ({
    name: (index + 1).toString(),
    ریال: item.price * 1000, // نگه‌داشتن مقدار به صورت عددی
  }));

  const numberFormatter = new Intl.NumberFormat("fa-IR");
  return (
    <ResponsiveContainer width={width} height={100}>
      <AreaChart data={goldDataview} margin={{ top: 10, left: 0 }}>
        <XAxis
          hide={true}
          dataKey="name"
          tickFormatter={(value) => numberFormatter.format(value)}
        />
        <YAxis
          hide={true}
          domain={["dataMin", "dataMax"]}
          tickFormatter={(value) => numberFormatter.format(value)}
        />
        <Tooltip
          label="false"
          formatter={(value) => numberFormatter.format(value)}
        />
        <Area type="monotone" dataKey="ریال" stroke="#8884d8" fill="#a2d2ff" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
