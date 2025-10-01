"use client";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [newContacts, setNewContacts] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewContacts() {
      try {
        const res = await fetch("/api/contact", { method: "GET" });
        if (!res.ok) throw new Error("Failed to load contacts");

        const result = await res.json();
        // Assuming your API returns: { newContacts: number }
        setNewContacts(result.newContacts || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNewContacts();
  }, []);

  // Handler for clicking the notification bell for navigation to contacts page what about using useRouter from next/router
    const handleNoticationClick = () => {
        window.location.href = "/dashboard/contact";
    };

  return (

    <button className="relative p-2 bg-white shadow rounded-full" onClick={handleNoticationClick}>
      <Bell className="w-5 h-5 text-gray-600" />

      {/* Only show notification badge if there are new contacts */}
      {!loading && newContacts > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
          {newContacts}
        </span>
      )}
    </button>
  );
}
