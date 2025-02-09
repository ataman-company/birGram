import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
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

  // Find min and max values
  const minValue = Math.min(...goldDataview.map((item) => item["ریال"]));
  const maxValue = Math.max(...goldDataview.map((item) => item["ریال"]));

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
        >
          {/* Custom labels for min/max */}
          <LabelList
            dataKey="ریال"
            content={({ x, y, value }) => {
              if (value === minValue || value === maxValue) {
                return (
                  <text
                    x={x}
                    y={y - (value === minValue ? -15 : 10)} // Adjust label position dynamically
                    fill={value === maxValue ? "black" : "black"}
                    fontSize="12px"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {numberFormatter.format(value)} ریال
                  </text>
                );
              }
              return null;
            }}
          />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default UserChart;
