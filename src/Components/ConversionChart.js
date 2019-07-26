import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { formatAndSortConversions } from "../utils/logUtils";

 const ConversionChart = ({conversions}) => {
    let dailyConversions = formatAndSortConversions(conversions);

  return (
    <div className="conversion-chart">
      <ResponsiveContainer width="100%" height={100}>
        <LineChart width={400} height={400} data={dailyConversions}>
          <Line type="monotone" dataKey="uv" stroke="#242424" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <p className="conversion-chart__chart-title">{`Conversions ${
        dailyConversions[0].name
      } - ${dailyConversions[dailyConversions.length - 1].name}`}</p>
    </div>
  );
};

export default ConversionChart;