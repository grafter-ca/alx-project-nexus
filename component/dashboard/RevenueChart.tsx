"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 6000 },
  { name: "Mar", revenue: 8000 },
  { name: "Apr", revenue: 6500 },
  { name: "May", revenue: 9000 },
  { name: "Jun", revenue: 7000 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow col-span-2">
      <h2 className="font-semibold mb-2">Total Revenue</h2>
      <p className="text-2xl font-bold mb-4">$980,273.00</p>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#22c55e" radius={[100, 100, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
