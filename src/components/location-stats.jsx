import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Location({ stats = [] }) {
  // Count cities
  const cityCount = stats.reduce((acc, item) => {
    acc[item.city] = (acc[item.city] || 0) + 1;
    return acc;
  }, {});


  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          width={700}
          height={300}
          data={cities.slice(0, 5)} // show top 5 cities
          onClick={(e) => {
            if (e && e.activeLabel) {
              alert(`City clicked: ${e.activeLabel}`);
            }
          }}
        >
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [`${value}`, name === 'count' ? 'Visitors' : name]}
            labelFormatter={(label) => `City: ${label}`}
          />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
