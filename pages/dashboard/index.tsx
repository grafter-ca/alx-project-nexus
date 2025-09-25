"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/dashboard");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
