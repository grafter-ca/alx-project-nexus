"use client";
import { Layers, ShoppingBag, ShoppingCart, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

interface DashboardData {
  categoryCount: number;
  userCount: number;
  productCount: number;
  orderCount: number;
}



export default function AnalyticsCards() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error("Failed to load analytics");

        const result = await res.json();
        setData(result.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <section className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold">User Analytics</h2>
        <p>Loading...</p>
      </section>
    );

  if (error)
    return (
      <section className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold">User Analytics</h2>
        <p className="text-red-500">{error}</p>
      </section>
    );

    const analyticsdata = [
      { label: "Users", value: data?.userCount || 0, icon: <Users /> },
      { label: "Products", value: data?.productCount || 0, icon: <ShoppingBag /> },
      { label: "Orders", value: data?.orderCount || 0, icon: <ShoppingCart /> },
      { label: "Categories", value: data?.categoryCount || 0, icon: <Layers /> },
    ]

  return (
    <section className="bg-white p-6 rounded shadow mb-6">
  <h2 className="text-xl font-bold">User Analytics</h2>

  <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
    {analyticsdata.map((item) => (
      <div
        key={item.label}
        className="border-l-8 hover:bg-green-50 border-green-800 p-4 bg-gray-100 rounded-xl flex items-center justify-center space-x-4 transition-all duration-200"
      >
        <div className="text-black">
          {React.cloneElement(item.icon, {
            className: "text-2xl lg:text-4xl hover:animate-pulse text-black",
          })}
        </div>
        <CardItem label={item.label} value={item.value} />
      </div>
    ))}
  </article>
</section>

  );
}

function CardItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-xl font-bold">{value || 0}</p>
      <p className="text-gray-500 font-semibold">{label}</p>
    </div>
  );
}
