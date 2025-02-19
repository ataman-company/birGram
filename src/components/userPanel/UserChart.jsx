import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UserChart = ({ goldData, width }) => {
  if (!goldData || goldData.length === 0) {
    return <div>در حال بارگزاری ...</div>;
  }

  const goldDataview = goldData.map((item, index) => ({
    name: (index + 1).toString(),
    ریال: item.price * 1000,
  }));

  const numberFormatter = new Intl.NumberFormat("fa-IR");

  return (
    <ResponsiveContainer width={width} height={250}>
      <AreaChart
        data={goldDataview}
        margin={{ top: 20, bottom: 20, left: 20, right: 20 }} // Added padding
      >
        <XAxis hide={true} dataKey="name" />
        <YAxis
          hide={true}
          domain={[
            (dataMin) => dataMin * 0.98, // Adds padding below min value
            (dataMax) => dataMax * 1.02, // Adds padding above max value
          ]}
        />
        <Tooltip formatter={(value) => numberFormatter.format(value)} />

        <Area
          type="monotone"
          dataKey="ریال"
          stroke="#1d3557"
          fill="rgba(69, 123, 157, 0.2)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default UserChart;
