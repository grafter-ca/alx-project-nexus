"use client";
import { Search,User} from "lucide-react";
import NotificationBell from "@/component/dashboard/NotificationBell";
import { useState } from "react";

export default function DashboardHeader() {
  const [isAvatarLoaded, setIsAvatarLoaded] =useState(false);
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h1 className="text-3xl font-bold">Overview</h1>

      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Search Bar */}
        <div className="flex items-center bg-white shadow px-3 py-2 rounded-lg w-full md:w-64">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 outline-none flex-1"
          />
        </div>

        {/* Notification */}
        <NotificationBell />

        {/* Avatar is not exist show user icon */}
        {
        isAvatarLoaded ? (
          <img
            src="/profile.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
            onLoad={() => setIsAvatarLoaded(true)}
            onError={() => setIsAvatarLoaded(false)}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="text-gray-500 w-6 h-6" />
          </div>
        )
        }
        
      </div>
    </header>
  );
}
