"use client";
import { useEffect, useState } from "react";

function AnimatedBar({ percent, color }: { percent: number; color: string }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percent), 200);
    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className={`${color} h-2 rounded-full transition-all duration-1000`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default function StatsOverview() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Stats Overview</h2>
      <div className="space-y-4">
        <div>
          <p>Women 63%</p>
          <AnimatedBar percent={63} color="bg-yellow-400" />
        </div>
        <div>
          <p>Men 88%</p>
          <AnimatedBar percent={88} color="bg-red-500" />
        </div>
        <div>
          <p>Kids 38%</p>
          <AnimatedBar percent={38} color="bg-purple-500" />
        </div>
      </div>
    </div>
  );
}
