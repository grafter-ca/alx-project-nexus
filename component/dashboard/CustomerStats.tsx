"use client";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IUser } from "@/types";

export default function CustomerStats() {
  const users = useSelector((state: RootState) => state.user.user as IUser[] | null) || [];

  // Filter clients only
  const clients: IUser[] = users.filter((u) => u.role === "client");

  // Current Customers = active clients
  const currentCustomers = clients.filter((u) => u.status === "active");

  // New Customers = created within last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newCustomers = currentCustomers.filter(
    (u) => new Date(u.createdAt) >= thirtyDaysAgo
  );

  // Percentages for dynamic stats
  const totalClients = clients.length || 1;
  const calcPercent = (count: number) =>
    Math.round((count / totalClients) * 100);

  // Static company targets
  const targetPercent = 90;
  const retargetPercent = 30;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Customers</h2>
      <div className="space-y-4">
        <StatItem
          label="Current Customers"
          value={calcPercent(currentCustomers.length)}
          color="secondary"
        />
        <StatItem
          label="New Customers"
          value={calcPercent(newCustomers.length)}
          color="success"
        />
        <StatItem
          label="Target Customers"
          value={targetPercent}
          color="warning"
          staticValue
        />
        <StatItem
          label="Retarget Customers"
          value={retargetPercent}
          color="error"
          staticValue
        />
      </div>
    </div>
  );
}

function StatItem({
  label,
  value,
  color,
  staticValue = false,
}: {
  label: string;
  value: number;
  color:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
  staticValue?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <div className="flex items-center">
        <CircularProgress variant="determinate" value={value} color={color} />
        <span className="ml-2 font-semibold">
          {value}% {staticValue && "(Goal)"}
        </span>
      </div>
    </div>
  );
}
